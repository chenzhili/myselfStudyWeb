window.onload = function(){
    /*获取轮播图片的尺寸信息对象*/
    var caroObj = {
        itemDistance:parseFloat(getComputedStyle(document.querySelectorAll(".carousel-content")[0]).width),
        totalStep:0,/*总共的步数*/
        step:40,  /*一个图片轮播完成需要的 次数*/
        time:60,  /*一次定时器的时间*/
        distanceDetail:0, /*一次定时器运动的距离*/
        Time:"",  /*定时器变量*/
        ele:document.querySelectorAll(".carousel-content")[0],
        n:0, /*记住总共的步数是否到了，到了停掉定时器*/
        state:0 /*停止定时器*/
    };
    /*获取图片资源*/
    var imgs = document.querySelectorAll(".car-item");
    console.log(imgs);
    var img_number = 0;
    for(var i=0,l=imgs.length;i<l;i++){   /*其实这里不需要的，window加载完成，图片肯定加载完了*/
        img_number++;
        if(img_number == l){
            beginTime();
        }
    }
    /*启动定时器的方法*/
    function beginTime(){
        caroObj.totalStep = caroObj.step * (imgs.length-1);
        if(caroObj.n == caroObj.totalStep){
            caroObj.state = 1;
        }
        if(caroObj.state) return;
        caroObj.distanceDetail = caroObj.itemDistance/caroObj.step/imgs.length;
        caroObj.ele.style.left = parseFloat(getComputedStyle(caroObj.ele).left) + -1 * caroObj.distanceDetail + "px";
        caroObj.n++;
        caroObj.Time = setTimeout(beginTime,caroObj.time)
    }
    /*每轮播完一个图片就切除放到最后*/
    function imgAppend(){

    }
};