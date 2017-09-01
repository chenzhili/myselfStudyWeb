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
        TimeAdd:"", /*补全动画的定时器*/
        ele:document.querySelectorAll(".carousel-content")[0],
        n:0, /*记住总共的步数是否到了，到了停掉定时器*/
        state:0, /*停止定时器*/
        stateAdd:0, /*停止补全定时器*/
        onlyOne:1, /*补全函数只执行一次*/
        addIsOver:0 /*补全动画是否完成*/
    };
    /*获取 actve item的资源*/
    var pageItems = document.querySelectorAll(".page-item");
    var regExp = /\s*?active/g;
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
        /*这里是让对应的 active 点亮*/
        var imgActive = document.querySelectorAll(".car-item")[0].dataset.position;
        for(var i=0,l=pageItems.length;i<l;i++){
            pageItems[i].className = pageItems[i].className.replace(regExp,"");
            if(imgActive == pageItems[i].dataset.active){
                pageItems[i].className += " active";
            }
        }
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
            caroObj.n = 0;
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
      startX:0, /*手指的按下的相对位置，就是用来 获取连续移动的距离，不是手指按下的初始位置，这个位置是时时变化的*/
      endX:0, /*手指按下的时时变化的位置，这个跟上面同样的用途，为了时时获取图片移动的距离*/
      originStart:0, /*这个是初始 手指按下的位置*/
      originEnd:0, /*这是手指最后松开的位置*/
        /*补充图片对应的值*/
      addDistance:0,
      step:20,
      time:10,
      itemDistance:0,
      addState:0,
      AddTime:"",
      addN:0,
      i:-3,
      itemImg:parseFloat(getComputedStyle(document.querySelectorAll(".car-item")[0]).width)
    };
    /*手势触摸等时间的发生*/
    /**
     * 这个比较重要，为了更好的 了解当前被事件触发的是 哪一张图片，我用个自定义变量去存储当前事件发生的位置
     */
    function touchStart(){
        /*移动端不存在鼠标进入事件*/
        /*手指接触屏幕*/
        caroObj.ele.addEventListener("touchstart",function(e){
            /*停止定时器*/
            caroObj.state = 1;
            clearTimeout(caroObj.TimeAgain);
            /*只让补全函数执行一次*/
            if(caroObj.onlyOne){
                addImgFinish(caroObj.n);
                caroObj.onlyOne = 0;
            }
            gestureMessage.startX = e.touches[0].clientX;
            gestureMessage.originStart = e.touches[0].clientX;
            return false;
        });
        /*手指在屏幕上滑动*/
        caroObj.ele.addEventListener("touchmove",function(e){
            if(caroObj.addIsOver == 1){
                caroObj.stateAdd = 1;
                gestureMessage.endX = e.touches[0].clientX;
                var cha = gestureMessage.endX-gestureMessage.startX;
                caroObj.ele.style.left = parseFloat(getComputedStyle(caroObj.ele).left) + cha + "px";
                gestureMessage.startX = e.touches[0].clientX;
            }
            return false;
        });
        /*手指触摸结束*/
        caroObj.ele.addEventListener("touchend",function(e){
            /*为了判断当前图片的位置*/
            var targetPosition = e.target.parentNode.dataset.position;
            var imgs = document.querySelectorAll(".car-item");
            var firstImgPosition = imgs[0].dataset.position;
            var lastImgPosition= imgs[imgs.length-1].dataset.position;
            /*
            * e.touches[0].clientX 在这里不存，需要用 e.changedTouches[0].clientX 来获取对应的触摸的坐标，这个要注意
            * */
            gestureMessage.originEnd = e.changedTouches[0].clientX;
            var cha = gestureMessage.originEnd - gestureMessage.originStart;
            gestureMessage.addN = 0;
            if(cha < 0){
                if(-1*cha <= gestureMessage.itemImg/2){
                    /*补充到当前图片*/
                    gestureMessage.addDistance = cha*(-1);
                    gestureMessage.itemDistance = gestureMessage.addDistance/gestureMessage.step;
                    gestureMessage.i = 1;
                    toucheAddImgFinish(gestureMessage.i);
                }else{
                    /*如果当前为最后一张图片，就一直留在当前图片的补全，不是就补充下一张*/
                    if(lastImgPosition == targetPosition){
                        gestureMessage.addDistance = cha*(-1);
                        gestureMessage.itemDistance = gestureMessage.addDistance/gestureMessage.step;
                        gestureMessage.i = 1;
                        toucheAddImgFinish(gestureMessage.i);
                    }else{
                        /*补充到下一张图片*/
                            /*这里是 让对应的 active*/
                        for(var i=0,l=pageItems.length;i<l;i++){
                            pageItems[i].className = pageItems[i].className.replace(regExp,"");
                            if(((Number(targetPosition)+1 == 5)?1:(Number(targetPosition)+1)) == pageItems[i].dataset.active){
                                pageItems[i].className += " active";
                            }
                        }
                        gestureMessage.addDistance = gestureMessage.itemImg - cha*(-1);
                        gestureMessage.itemDistance = gestureMessage.addDistance/gestureMessage.step;
                        gestureMessage.i = -1;
                        toucheAddImgFinish(gestureMessage.i);
                    }
                }
            }else{
                if(cha <= gestureMessage.itemImg/2){
                    /*补充到当前图片*/
                    gestureMessage.addDistance = cha;
                    gestureMessage.itemDistance = gestureMessage.addDistance/gestureMessage.step;
                    gestureMessage.i= -1;
                    toucheAddImgFinish(gestureMessage.i);
                }else{
                    /*如果当前为第一张图片，就一直留在当前图片，否则就补全上一张图片的动画*/
                    if(firstImgPosition == targetPosition){
                        gestureMessage.addDistance = cha;
                        gestureMessage.itemDistance = gestureMessage.addDistance/gestureMessage.step;
                        gestureMessage.i= -1;
                        toucheAddImgFinish(gestureMessage.i);
                    }else{
                        /*补充到上一张图片*/
                            /*让对应的 active*/
                        for(var i=0,l=pageItems.length;i<l;i++){
                            pageItems[i].className = pageItems[i].className.replace(regExp,"");
                            if(((Number(targetPosition)-1)?(Number(targetPosition)-1):4) == pageItems[i].dataset.active){
                                pageItems[i].className += " active";
                            }
                        }
                        gestureMessage.addDistance = gestureMessage.itemImg - cha;
                        gestureMessage.itemDistance = gestureMessage.addDistance/gestureMessage.step;
                        gestureMessage.i= 1;
                        toucheAddImgFinish(gestureMessage.i);
                    }
                }
                /*这里最后如果没有进行任何操作，就会再次启动定时器*/
            }
            return false;
        });
    }
    /*触摸事件移动图片，补全图片动画*/
    function toucheAddImgFinish(i){
        /*if(gestureMessage.addState) return;*/
        if(gestureMessage.addN == gestureMessage.step) return;
        caroObj.ele.style.left = parseFloat(getComputedStyle(caroObj.ele).left) + i * gestureMessage.itemDistance + "px";
        gestureMessage.addN++;
        gestureMessage.AddTime = setTimeout(function(){
            toucheAddImgFinish(i);
        },gestureMessage.time);
    }
    /*定时器停止是否一个图片已经播放完成，没有播放完成自动补全*//*这里要写成所有公用的，包括触摸事件移动图片*/
    /*这里如果把 参数当传参传入，导致一个问题，就是按值传递，不会改变原有的变量，所以还是写成两个补全动画函数*/
    function addImgFinish(n){
        if(n % caroObj.step != 0 && n != 0){
            if(caroObj.stateAdd) return;
            caroObj.ele.style.left = parseFloat(getComputedStyle(caroObj.ele).left) + -1 * caroObj.distanceDetail + "px";
            caroObj.n++;
            caroObj.TimeAdd = setTimeout(function(){
                addImgFinish(caroObj.n);
            },caroObj.time);
        }else{
            caroObj.addIsOver = 1;
            caroObj.n++;
            caroObj.stateAdd = 1;
            /*这里没必要删除前面的图片，这里没有在让他自动轮播，这里可以解决当触摸发生左右滑动的时候，去添加和删除图片的删除，还有执行过程中的不定性
            * 不定性指的是：是 touchmove 和 定时器 谁先发生 导致的不确定性
            * */
            /*var firstImg = document.getElementsByClassName("car-item")[0];
            var parentDom = document.querySelectorAll(".carousel-content")[0];
            caroObj.ele.removeChild(firstImg);
            parentDom.appendChild(firstImg);
            caroObj.ele.style.left = 0;*/
        }
    }
};
/*成都户口落户所需要的材料*/
/*
1、天府新区集体户户主内页、空白内页的领取
*毕业证    原件  复印件 2
*身份证    原件  复印件 2
*户口本    原件  复印件 2
*学信网学历证明  复印件 2
* */
/*
2、申请人 无房证明 原件
* 只需要带上身份证到特定 地方去
* */
/*
3、落户集体户所需材料
* 入户申请表  （有）
* 毕业证书 原件 复印件  （有）
* 居民户口簿和身份证 原件 复印件  （有）
* 申请人 无房证明 原件 （无）
* 集体户户主内页、空白内页 （代办）
* */