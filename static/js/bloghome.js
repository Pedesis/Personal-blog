    //轮播图
    var slideshow = function () {
        var slideShowUl = document.querySelector(".slideshow ul");
        var aNode = document.querySelectorAll(".slideshow .dot>a");
        var slideShowLi = slideShowUl.querySelectorAll(".slideshow ul>li");
        var flag = 0;
        var index = 0;
        var liWidth = slideShowLi[0].offsetWidth;
        var ulTimer=0;
        function next() {
            index++;
           var speed=20;
            //slideShowUl.style.left = -(index * liWidth) + "px";
            ulMove(-800*index,20)
            points();
        }
        function getStyle(obj, name) {
            return window.getComputedStyle && getComputedStyle(obj, null)[name] || obj.currentStyle[name];
        }
        var ulMove=function(target,speed){
                clearInterval(ulTimer);
                var current=parseInt(getStyle(slideShowUl, "left"));
                if(current > target) {
                    speed = -speed;
                }
                ulTimer=setInterval(function(){
                    var oldValue = parseInt(getStyle(slideShowUl, "left"));
                    var newValue = oldValue + speed;
                    if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
                        newValue = target;
                    }
                    slideShowUl.style.left=  newValue+"px";

                    if(newValue==target){
                        clearInterval(ulTimer);
                        if (index == 4) {
                            index = 0;
                        }
                        
                    }
                },60)
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