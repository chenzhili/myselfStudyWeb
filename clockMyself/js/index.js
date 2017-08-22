/**
 * Created by YK on 2017/8/22.
 */
window.onload = function(){
    /*时钟表盘的尺寸822px*822px, window.innerWidth/822 = i 得到系数
    时针 58*259 ，圆球直径 ：58
    分针 56*367 ，圆球直径 ：56
    秒针 48*328 , 圆球直径 ：48*/
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    var img = new Image();
    img.src = "img/clock.png";
    img.onload = function(){
        ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
    };
};