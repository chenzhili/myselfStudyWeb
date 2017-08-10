/**
 * Created by YK on 2017/8/10.
 */
var canvas = document.getElementById("cvs");
var ctx = canvas.getContext("2d");
/*画线*/
/*ctx.moveTo(10,100);
ctx.lineTo(100,200);
ctx.lineWidth = 5;
ctx.strokeStyle = "#f00";
ctx.stroke();*/
ctx.moveTo(10,10);
ctx.lineWidth = 5;
ctx.strokeStyle = "#f00";
ctx.lineTo(20,20);
ctx.stroke();
canvas.addEventListener("touchmove",function(e){
    event.preventDefault();
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    var px= e.touches[0].pageX;
    var sx= e.touches[0].screenX;
    console.log(x + "" + px + ""+sx);

});
canvas.addEventListener("touchstart",function(e){
    event.preventDefault();
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    ctx.lineTo(x,y);
    ctx.stroke();
    var px= e.touches[0].pageX;
    var sx= e.touches[0].screenX;
    console.log("c"+x);
    console.log("p"+px);
    console.log("s"+sx);
});
canvas.addEventListener("touchend",function(e){
    event.preventDefault();
    console.log("完成了吗");
});