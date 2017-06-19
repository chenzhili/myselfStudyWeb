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
    console.log(target.id);
    if(target.nodeName == "DIV"){
        $("#type div").removeClass("type_active");
        $(target).addClass("type_active");
        if(target.id == "pk"){
            $("#downloadSplash").attr("src","img/download_pk_splash.png");
            $("#titleImg").attr("src","img/download_pk_title.png");
            $("#linkIOS").attr("href","#pk");
            $("#linkAn").attr("href","http://www.jiucaijihua.com/jiucai/jiucai_ssc.apk");
            makeQr("http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=pk");
        }else if(target.id == "ssc"){
            $("#downloadSplash").attr("src","img/download_ssc_splash.png");
            $("#titleImg").attr("src","img/download_ssc_title.png");
            $("#linkIOS").attr("href","#ssc");
            $("#linkAn").attr("href","http://www.jiucaijihua.com/jiucai/jiucai_pk.apk");
            makeQr("http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=ssc");
        }
    }
});
function makeQr(http){
    $("#qrCode")[0].innerHTML = "";
    new QRCode($("#qrCode")[0],{
        width:"140",
        height:"140"
    }).makeCode(http);
}
makeQr("http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=pk");