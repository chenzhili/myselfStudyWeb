/**
 * Created by YK on 2017/8/10.
 */
var canvas = document.getElementById("cvs");
var ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;
var img = new Image();
ctx.lineWidth = 5;
ctx.strokeStyle = "#f00";
canvas.addEventListener("touchmove",function(e){
    event.preventDefault();
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    ctx.stroke();
    ctx.lineTo(x,y);
});
canvas.addEventListener("touchstart",function(e){
    event.preventDefault();
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    ctx.moveTo(x,y);
});
canvas.addEventListener("touchend",function(e){
    event.preventDefault();
    /*img.src = canvas.toDataURL("image/png");
    console.log(img);
    document.getElementById("imgContent").appendChild(img);*/
});
