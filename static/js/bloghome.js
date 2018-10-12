    //轮播图
    var slideshow = function () {
        var slideShowUl = document.querySelector(".slideshow ul");
        var aNode = document.querySelectorAll(".slideshow .dot>a");
        var slideShowLi = slideShowUl.querySelectorAll(".slideshow ul>li");
        var flag = 0;
        var index = 0;
        var liWidth = slideShowLi[0].offsetWidth;
        function next() {
            index++;
            if (index == 4) {
                index = 0;
            }
            slideShowUl.style.left = -(index * liWidth) + "px";

            points();
        }
        function prev() {
            if (index == 0) {
                index = 4;
            }
            index--;
            slideShowUl.style.left = -(index * liWidth) + "px";
            points();
        }
        /*左右点击下一张
        nextNode.onclick=function(){
            clearInterval(timer);
            next();
            move();
        
        }
        prevNode.onclick=function(){
            clearInterval(timer);
            prev();
            move();
        }
        */
        var timer = 0;
        //move();
        function points() {
            for (var i = 0; i < aNode.length; i++) {
                aNode[i].className = "";
            }
            if (index == 4) {
                index = 0;
            }
            aNode[index].className = "active";
        }
        for (var i = 0; i < aNode.length; i++) {
            aNode[i].num = i;
            aNode[i].onclick = function () {
                clearInterval(timer);
                slideShowUl.style.left = -(this.num * liWidth) + "px";
                index = this.num;
                points();
                move();
            }
        }
        function move() {
            clearInterval(timer);
            timer = setInterval(function () {
                next();

            }, 1000)
        }
        move();
    }
    slideshow();