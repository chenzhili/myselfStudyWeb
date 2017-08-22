/**
 * Created by YK on 2017/8/22.
 */
window.onload = function(){
    /*时钟表盘的尺寸822px*822px, window.innerWidth/822 = i 得到系数
    时针 58*259 ，圆球直径 ：58
    分针 56*367 ，圆球直径 ：56
    秒针 48*328 , 圆球直径 ：48*/
    /*所有的img对象*/
    var imgObj = {
      clock:new Image(),
      hours:new Image(),
      minutes:new Image(),
      seconds:new Image()
    };
    imgObj.clock.src = "img/clock.png";
    imgObj.hours.src = "img/h.png";
    imgObj.minutes.src = "img/m.png";
    imgObj.seconds.src = "img/s.png";
    var i = window.innerWidth/imgObj.clock.width;
    /*所有对象的对应的系数*//*width也是属于 球的直径*/
    var sizeMessage={
          hours:{
              height:imgObj.hours.height*i,
              width:imgObj.hours.width*i
          },
        minutes:{
            height:imgObj.minutes.height*i,
            width:imgObj.minutes.width*i
        },
        seconds:{
            height:imgObj.seconds.height*i,
            width:imgObj.seconds.width*i
        }
    };
    /*测试promise.all来判断图片是否全部加载了*///有问题，就promise只会执行一次，如果失败，就是败了，不会去重复获取
    /*var obj = {
        a:1,
        b:1,
        c:1
    };
    var a = new Promise(function(resolve,reject){
        if(obj.a){
            resolve("对的a"+obj.a);
        }else{
            reject("错的a"+obj.a);
        }
    });
    var b = new Promise(function(resolve,reject){
        if(obj.b){
            resolve("对的b"+obj.b);
        }else{
            reject("错的b"+obj.b);
        }
    });
    var c = new Promise(function(resolve,reject){
        if(obj.c){
            resolve("对的c"+obj.c);
        }else{
            reject("错的c"+obj.c);
        }
    });
    Promise.all([a,b,c])
        .then(function(data){
            console.log(data);
        })
        .catch(function(err){
            console.log(err);
        });*/
    /*还是要用onload事件去轮训每一个图片，因为事件发生的时候，说明当前图片已经被缓存了*//*要用promise来获取最后的值，返回有就说明加载完了*/


    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    /*imgObj.clock.onload = function(){
        ctx.drawImage(imgObj.clock,0,0,imgObj.clock.width,imgObj.clock.height,0,0,canvas.width,canvas.height);
    };*/
};