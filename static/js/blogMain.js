//此为博客主页
var ajax=function(request){
    var r=new XMLHttpRequest();
    //目前设置成立同步执行，异步时会出现加载的问题，或用getbyId解决
    r.open(request.method,request.url,true);
    if(request.contentType!==undefined){
        r.setRequestHeader('Content-Type', request.contentType);
    }
    r.onreadystatechange=function(){
        if(r.readyState===4){
            request.callback(r.response);
        }
    }
    if(request.method==="GET"){
        r.send();
    }else{
        r.send(request.data);
    }
}

var blogTemplate = function(blog) {
    var id = blog.id
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
    <div class="blog-cell">
        <div class="">
            <a class="blog-title" href="blog/detial?id=${id}" data-id="${id}">
                ${title}
            </a>
        </div>
        <div class="blog-information">
            <span>${author}</span> @ <time>${time}</time>
        </div>
    </div>
    `
    return t
}
var insertBlogAll = function(blogs) {
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        var t = blogTemplate(b)
        html += t
    }
    // 把数据写入 直接用覆盖式写入
    var div = document.querySelector('#content')
    div.innerHTML = html
}


//刷新所有博客
var blogAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        //contentType: 'application/json',
        callback: function(response) {
            console.log('响应', response);
            var blogs = JSON.parse(response);
            
            window.blogs = blogs;
            insertBlogAll(blogs);
        }
    }
    ajax(request)
}

// //添加新的博文
// var blogNew=function(form){
//     // var form = {
//     //     title: "测试标题",
//     //     author: "gua",
//     //     content: "测试内容",
//     //         };
//     var data = JSON.stringify(form)
//     var request = {
//         method: 'POST',
//         url: '/api/blog/add',
//         data: data,
//         contentType: 'application/json',
//         callback: function(response) {
//             console.log('响应', response)
//             var res = JSON.parse(response)
//             if (res.success) {
//                 // window.location.href = '/'
//                 log("成功");
//             } else {
//                 // alert('登录失败')
//                 log("失败");
//             }
//         }
//     }
//     ajax(request)
// }
// var bindEvents=function(){
//     var button=findElement("#id-button-submit");
//     button.addEventListener("click",function(){
//         log("button",1);
//         var form={
//             title:findElement("#id-input-title").value,
//             author:findElement("#id-input-author").value,
//             content:findElement("#id-input-content").value
//         }
//         blogNew(form);
//     })
    
// }
var _main=function(){
    blogAll();
    //bindEvents();
}
_main();