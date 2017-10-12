/*视频播放*/
let video = document.getElementById("video");
let operate = document.getElementById("operate");
let bar = document.getElementsByClassName("progressbar")[0];
let playPause = document.getElementsByClassName("play-pause")[0];
let currentTime = document.getElementsByClassName("current")[0];
let duration = document.getElementsByClassName("duration")[0];
let progressBar = document.getElementsByClassName("progress-bar")[0];
let barActive = document.getElementsByClassName("bar-active")[0];
let circle = document.getElementsByClassName("circle")[0];
let fullScreen = document.getElementsByClassName("full")[0];
let play = {
  playAndPause:0,
  showAndHideBar:false,
  dblPlayAndPause:false,
  btnRotateHideShow:false,
  dblLastTime:0,  /*用于存储上一次触发单击事件的时间*/
  dblTime:null,  /*存储定时器，让单击一次多少毫秒后运行*/
  barTime:null, /*bar自动隐藏的定时器*/
  cssDisplayTime:null, /*把对应隐藏的 bar 的display 属性 转变成 none*/
  cssDisplayPlayTime:null, /*这是在双击暂停的时候，出现的图标的隐藏定时器*/
  operateTime:null, /*对于隐藏图标的定时器*/
  currentTime:0, /*现在的播放时间*/
  duration:0, /*总时长*/
  barTotalWidth:parseInt(getComputedStyle(progressBar).width), /*获取进度条的总长度*/
  touchStartX:0, /*触摸开始的位置*/
  touchEndX:0, /*触摸结束的位置*/
  touchInitX:0, /*初始化的位置*/
  barClientStartX:progressBar.getBoundingClientRect().left, /*获取进度条距离左边的距离*/
  barClientEntX:progressBar.getBoundingClientRect().left+parseInt(getComputedStyle(progressBar).width), /*获取进度条距离右边的距离*/
};
/*这种方法过时了*/
/*operate.addEventListener("doubleclick",(e)=>{
    let me = e.target;
    if(play.playAndPause == 0){
        me.className = "hide";
        video.play();
    }else{
        if(play.playAndPause%2 == 1){
            me.className = "show";
            video.pause();
        }else{
            me.className = "hide";
            video.play();
        }
    }
    platState.playAndPause++;
    return false;
});*/
/*
* video.currentTime 通过指定这个值让视频播放指定的地方
* */
/**
 * 播放视屏的步骤需求
 * 1、页面ui的实现，底部滚动条，依次的按钮为，播放/暂停 播放时长/总时长 进度条 全屏(这是在竖屏的情况，横屏情况下还未考虑)
 * 2、对于暂停事件，双击屏幕开始播放或者暂停播放，单击底部按钮
 * 3、对于隐藏显示控制条是通过单击屏幕来进行切换
 */
/**
 * 简单生成base64的图片
 * @param src
 */
function trunBase64(src){
    let canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    let ctx = canvas.getContext("2d");
    let img = new Image();
    let url;
    img.src = src;
    img.onload = function(){
        ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
        url = canvas.toDataURL("image/png");
        console.log(url);
    };
}

/*trunBase64("img/play_black.png");*/
/**
 * 需要添加的class和删除的class
 * @param el
 * @param add
 * @param remove
 * @returns {string}
 */
function addClassAndRemove(el,add,remove){
    let classes = el.className;
    return classes.split(remove).join("")+add;
}
/**
 * 全屏
 */
fullScreen.addEventListener("click",function(){
    video.webkitRequestFullScreen();
});
/**
 * 显示或者隐藏bar,并且用单击模拟双击事件，这种模拟双击的方式好好看看
 * ideo.addEventListener("dblclick",(e)=>{ //这种有问题，用单击事件去模拟双击事件
    console.log("触发没");
   return false;
});
 */
video.addEventListener("click",(e)=>{
    /*清除所有的定时器*/
    play.barTime && clearTimeout(play.barTime);
    play.cssDisplayTime && clearTimeout(play.cssDisplayTime);

    let nowTime = new Date().getTime();
    if(nowTime-play.dblLastTime < 400){
        /*这个就算双击*/
        play.dblLastTime = 0;/*这里清零，防止在400ms内连续点击超过2下*/
        play.dblTime && clearTimeout(play.dblTime);

        rotateHideShow();
        if(play.playAndPause){
            video.play();
            operate.className = "";
            play.cssDisplayPlayTime && clearTimeout(play.cssDisplayPlayTime);
            play.operateTime && clearTimeout(play.operateTime);
            operate.style.display = "none";
        }else{
            video.pause();
            operate.style.display = "block";
            play.cssDisplayPlayTime = setTimeout(()=>{
                operate.className = "hide";
                setTimeout(()=>{
                    operate.style.display = "none";
                },1000)
            },1000)
        }
        play.playAndPause = !play.playAndPause;
    }else{
        /*单击*/
        play.dblLastTime = nowTime;
        play.dblTime = setTimeout(()=>{
            /*400ms后在运行单击事件，等待是否有双击*/
            if(play.showAndHideBar){
                bar.style.display = "block";
                bar.className = addClassAndRemove(bar,"show","hide");
                hideBar(bar);
            }else{
                bar.className = addClassAndRemove(bar,"hide","show");
                setTimeout(()=>{
                    play.cssDisplayTime = bar.style.display = "none";
                },1000)
            }
            play.showAndHideBar = !play.showAndHideBar;
        },400);
    }
    return false;
});
/**
 * 点击 bar上的 播放或者暂停按钮
 */
playPause.addEventListener("click",()=>{
    function funTrue(){
        video.play();
    }
    function funFalse(){
        video.pause();
    }
    rotateHideShow(funTrue,funFalse);
    play.playAndPause = !play.playAndPause;
    return false;
});
/**
 * 让时间动起来
 */
video.addEventListener("timeupdate",(e)=>{
    let video = e.target;
    play.duration = video.duration;
    play.currentTime = video.currentTime;
    duration.innerHTML = convertTime(play.duration);
    currentTime.innerHTML = convertTime(play.currentTime);
    barCss(play.currentTime,play.duration);
});
/**
 * 拖拽滚动球进行快进
 */
circle.addEventListener("touchstart",(e)=>{
    video.pause();
    circle.className = "circle radiusGradient";
    play.barTime && clearTimeout(play.barTime);
    bar.style.display = "block";
    bar.style.opacity = "1";
    play.touchStartX = e.touches[0].clientX;
    play.touchInitX = e.touches[0].clientX;
    return false;
});
circle.addEventListener("touchmove",(e)=>{
    /*if(e.touches[0].clientX < play.barClientStartX){
        e.touches[0].clientX = play.barClientStartX;
    }
    if(e.touches[0].clientX > play.barClientEntX){
        e.touches[0].clientX = play.barClientEntX;
    }*/
    circle.style.left = parseInt(circle.style.left) + e.touches[0].clientX - play.touchStartX +"px";
    if(parseInt(circle.style.left) < 0){
        circle.style.left = 0;
    }
    if(parseInt(circle.style.left) > parseInt(getComputedStyle(progressBar).width)){
        circle.style.left = getComputedStyle(progressBar).width;
    }
    barActive.style.width = circle.style.left;
    play.touchStartX = e.touches[0].clientX;
    return false;
});
circle.addEventListener("touchend",(e)=>{
    circle.className = "circle";
    play.touchEndX = e.changedTouches[0].clientX;
    let addTime = (play.touchEndX-play.touchInitX)*play.duration/parseInt(getComputedStyle(progressBar).width);
    video.currentTime +=addTime;
    video.play();
    return false;
});
/**
 * 活动屏幕进行快进和后退
 */
video.addEventListener("touchstart",(e)=>{
    console.log(1);
    return false;
});
video.addEventListener("touchmove",(e)=>{
    console.log(2);
    return false;
});
video.addEventListener("touchend",(e)=>{
    console.log(3);
    return false;
});
/**
 * 不进行任何操作的情况下，过 2s 隐藏 bar
 * @param el
 */
function hideBar(el){
    play.barTime = setTimeout(()=>{
        bar.className = addClassAndRemove(el,"hide","show");
        play.showAndHideBar = true;
        setTimeout(()=>{
            play.cssDisplayTime = el.style.display = "none";
        },1000);
    },2000);
}
/**
 * 旋转bar的播放或者暂停图标
 */
function rotateHideShow(funTrue,funFalse){
    if(play.btnRotateHideShow){
        funTrue && funTrue();
        playPause.className = "rotateAndHidePlay";
        setTimeout(()=>{
            playPause.src = `data:image/png;base64,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`;
            playPause.style.opacity = 1;
        },200);
    }else{
        funFalse && funFalse();
        playPause.className = "rotateAndHidePause";
        setTimeout(()=>{
            playPause.src = `data:image/png;base64,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`;
            playPause.style.opacity = 1;
        },200);
    }
    play.btnRotateHideShow = !play.btnRotateHideShow;
}
/**
 * 格式化时间
 * @param time
 * @returns {string}
 */
function convertTime(time){
    let h,hSplit,m,s;
    h = Math.floor(time/60/60);
    h = h < 10?"0"+h:h;
    h = Number(h) || "";
    hSplit = h?h+":":"";
    m = Math.floor((time-h*60*60)/60);
    m = m < 10?"0"+m:m;
    s = Math.floor(time%60);
    s = s < 10?"0"+s:s;
    return `${hSplit}${m}:${s}`
}
/**
 * 进度条进度样式函数
 * @param currentTime
 * @param duration
 */
function barCss(currentTime,duration){
    let currentDistance = play.barTotalWidth*currentTime/duration;
    barActive.style.width = currentDistance+"px";
    circle.style.left = currentDistance+"px";
}
window.onload = function(){
    hideBar(bar);
    console.log(play.barClientStartX);
    console.log(play.barClientEntX);
};
