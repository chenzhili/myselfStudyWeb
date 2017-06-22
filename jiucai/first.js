/**
 * Created by YK on 2017/6/14.
 */
$("#nav").click(function(e){
    if(e.target.nodeName == "A"){
        $("#nav a").removeClass("active");
        $(e.target).addClass("active");
    }
});
$("#type").click(function(e){
    var target = e.target;
    if(target.nodeName == "DIV"){
        $("#type div").removeClass("type_active");
        $(target).addClass("type_active");
        if(target.id == "pk"){
            $("#downloadSplash").attr("src","img_pc/download_pk_splash.png");
            $("#titleImg").attr("src","img_pc/download_pk_title.png");
            $("#linkIOS").attr("href","http://fir.im/ydth");
            $("#linkAn").attr("href","http://www.jiucaijihua.com/jiucai/jiucai_ssc.apk");
            makeQr("qrCode","http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=pk");
        }else if(target.id == "ssc"){
            $("#downloadSplash").attr("src","img_pc/download_ssc_splash.png");
            $("#titleImg").attr("src","img_pc/download_ssc_title.png");
            $("#linkIOS").attr("href","http://fir.im/hvcn");
            $("#linkAn").attr("href","http://www.jiucaijihua.com/jiucai/jiucai_pk.apk");
            makeQr("qrCode","http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=ssc");
        }
    }
});
/*pc版*/
function makeQr(ele,http,state){
    $("#"+ele)[0].innerHTML = "";
    new QRCode($("#"+ele)[0],{
        width:"140",
        height:"140"
    }).makeCode(http);
    if(state){
        $("#"+ele+" img").css("width","100%");
    }
}
makeQr("qrCode","http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=pk");
/*判断屏幕尺寸的方法*/
function judgeScreen(bigClass,smallClass){
    var big = document.getElementsByClassName(bigClass)[0];
    var small = document.getElementsByClassName(smallClass)[0];
    if(window.screen && screen.width){
        if(screen.width > "1024"){
            big.style.display = "block";
            small.style.display = "none";
        }else{
            big.style.display = "none";
            small.style.display = "block";
        }
    }
}
window.onload = function(){
    judgeScreen("big_screen","small_screen");
};

/*小屏幕的js*/
var mySwiper;
$(document).ready(function(){
    mySwiper = new Swiper ('.swiper-container', {
        direction:"horizontal",
        observer:true,
        observeParents:true,
        loop: true,
        onSlideChangeEnd:function(swiper){
            if(swiper.activeIndex == 2 || swiper.activeIndex == 0){
                $(".switch_content").removeClass("switch_active");
                $($(".switch_content")[0]).addClass("switch_active");
            }else if(swiper.activeIndex == 3 || swiper.activeIndex == 1){
                $(".switch_content").removeClass("switch_active");
                $($(".switch_content")[1]).addClass("switch_active");
            }
        }
    });
    /*模态对应的不同二维的方法*/
    $("#small_pk_code").click(function(){
        console.log(1);
        $(".mark").css("display","block");
        $("#style_title").attr("src","img_mobile/mark_code_pk.png");
        makeQr("mark_code","http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=pk","100");
    });
    $("#small_ssc_code").click(function(){
        $(".mark").css("display","block");
        $("#style_title").attr("src","img_mobile/mark_code_ssc.png");
        makeQr("mark_code","http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=ssc","100");
    });
    $(".mark").click(function(){
        $(this).css("display","none");
    });
});
$("#small_switch").click(function(e){
    if(e.target.innerText == "重庆时时彩"){
        $(".switch_content").removeClass("switch_active");
        $($(".switch_content")[0]).addClass("switch_active");
        mySwiper.slideTo(2);
    }else{
        $(".switch_content").removeClass("switch_active");
        $($(".switch_content")[1]).addClass("switch_active");
        mySwiper.slideTo(3);
    }
});