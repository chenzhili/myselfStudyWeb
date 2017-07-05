/**
 * Created by YK on 2017/7/4.
 */
$(document).ready(function(){
    makeQr("code","http://www.ggyucai.com/index.php?s=/home/home/down");
    $(".close_modal").click(function(){
        $(".modal").css("display","none");
    });
    $(".help").click(function(){
        $(".modal").css("display","block");
    });
});
function makeQr(ele,http){
    $("#"+ele)[0].innerHTML = "";
    new QRCode($("#"+ele)[0],{
        width:"140",
        height:"140"
    }).makeCode(http);
}