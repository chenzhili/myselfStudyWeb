window.onload = function(){
    /*获取轮播图片的尺寸信息对象*/
    var caroObj = {
        itemDistance:parseFloat(getComputedStyle(document.querySelectorAll(".carousel-content")[0]).width),
        totalStep:0,/*总共的步数*/
        step:40,  /*一个图片轮播完成需要的 次数*/
        time:10,  /*一次定时器的时间*/
        distanceDetail:0, /*一次定时器运动的距离*/
        Time:"",  /*定时器变量*/
        TimeAgain:"", /*轮播完一个图片中途停留的时间定时器*/
        ele:document.querySelectorAll(".carousel-content")[0],
        n:0, /*记住总共的步数是否到了，到了停掉定时器*/
        state:0 /*停止定时器*/
    };
    /*获取图片资源*/ 
    var imgs = document.querySelectorAll(".car-item");
    var img_number = 0;
    for(var i=0,l=imgs.length;i<l;i++){   /*其实这里不需要的，window加载完成，图片肯定加载完了*/
        img_number++;
        if(img_number == l){
            beginTime();
            touchStart();
        }
    }
    /*启动定时器的方法*/
    function beginTime(){
        caroObj.totalStep = caroObj.step * (imgs.length-1);
        /*if(caroObj.n == caroObj.totalStep){
            caroObj.state = 1;
        }*/
        if(caroObj.state) return;
        caroObj.distanceDetail = caroObj.itemDistance/caroObj.step/imgs.length;
        caroObj.ele.style.left = parseFloat(getComputedStyle(caroObj.ele).left) + -1 * caroObj.distanceDetail + "px";
        caroObj.n++;
        imgAppend(caroObj.n);
        caroObj.Time = setTimeout(beginTime,caroObj.time)
    }
    /*每轮播完一个图片就切除放到最后*/
    function imgAppend(n){
        if(n%caroObj.step == 0 && n != 0){
            var firstImg = document.getElementsByClassName("car-item")[0];
            var parentDom = document.querySelectorAll(".carousel-content")[0];
            caroObj.ele.removeChild(firstImg);
            parentDom.appendChild(firstImg);
            caroObj.ele.style.left = 0;
            /*每次轮播完一个图片停止一点然后在进行第二次*/
            caroObj.state = 1;
            caroObj.TimeAgain = setTimeout(function(){
                caroObj.state = 0;
                beginTime();
            },1000)
        }

    }
    /*存储手指的位置等信息*/
    var gestureMessage = {
      startX:0, /*手指按下的位置*/
      endX:0 /*手指松开的位置*/
    };
    /*鼠标进入，停止定时器*/
    function touchStart(){
        /*移动端不存在鼠标进入事件*/
        /*手指接触屏幕*/
        caroObj.ele.addEventListener("touchstart",function(e){
            /*停止定时器*/
            caroObj.state = 1;
            clearTimeout(caroObj.TimeAgain);
            gestureMessage.startX = e.touches[0].clientX;
            console.log(gestureMessage.startX);
        });
        /*手指在屏幕上滑动*/
        caroObj.ele.addEventListener("touchmove",function(e){
            gestureMessage.endX = e.touches[0].clientX;
            console.log(gestureMessage.endX);
        })
    }
};