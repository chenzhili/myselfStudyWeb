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
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    /*时分秒的定时器变量*/
    var h,m,s,c;
    /*每次旋转得度数*/
    var deg = (Math.PI/180)*6;
    /*测试promise.all来判断图片是否全部加载了*///有问题，就promise只会执行一次，如果失败，就是败了，不会去重复获取
    var sizeMessage;
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
    /*还是要用onload事件去轮训每一个图片，因为事件发生的时候，说明当前图片已经被缓存了*/
    /*用于判断图片是否加载完成*/
    var imgOver = 0;
    for(var key in imgObj){
        imgObj[key].onload = function(){
            imgOver++;
            if(imgOver == 4){
                /*尺寸信息*/
                sizeMessage = getSizeMessage();
                /*这里进行所有的操作*/
                initPaintImg();
                /*/!*测试旋转*!/
                beginTime();*/
            }
        }
    }
    /*先获取基本的尺寸信息*/
    function getSizeMessage(){
        /*所有对象的对应的系数*//*width也是属于 球的直径*/
        var i = window.innerWidth/imgObj.clock.width;
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
        return sizeMessage;
    }
    /*对图片的初始化*/
    function initPaintImg(){
        /*表盘*/
        ctx.drawImage(imgObj.clock,0,0,imgObj.clock.width,imgObj.clock.height,0,0,canvas.width,canvas.height);
        ctx.save();
        /*秒针*/
        var destXS = canvas.width/2-sizeMessage.seconds.width/2,destYS= canvas.width/2-sizeMessage.seconds.height+sizeMessage.seconds.width/2;
        ctx.drawImage(imgObj.seconds,0,0,imgObj.seconds.width,imgObj.seconds.height,destXS,destYS,sizeMessage.seconds.width,sizeMessage.seconds.height);
        /*分针*/
        var destXM = canvas.width/2-sizeMessage.minutes.width/2,destYM = canvas.width/2-sizeMessage.minutes.height+sizeMessage.minutes.width/2;
        ctx.drawImage(imgObj.minutes,0,0,imgObj.minutes.width,imgObj.minutes.height,destXM,destYM,sizeMessage.minutes.width,sizeMessage.minutes.height);
        /*时针*/
        var destXH = canvas.width/2-sizeMessage.hours.width/2,destYH = canvas.width/2-sizeMessage.hours.height+sizeMessage.hours.width/2;
        ctx.drawImage(imgObj.hours,0,0,imgObj.hours.width,imgObj.hours.height,destXH,destYH,sizeMessage.hours.width,sizeMessage.hours.height);
        ctx.restore();
    }
    /*思路应该是，每隔一秒去获取时间，然后画图，就可以了*/
    
    /*这种思路有问题*/
    /*function SeRotate(){
        /!*ctx.clearRect(0,0,canvas.width,canvas.height);*!/
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(deg);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        var destXS = canvas.width/2-sizeMessage.seconds.width/2,destYS= canvas.width/2-sizeMessage.seconds.height+sizeMessage.seconds.width/2;
        ctx.drawImage(imgObj.seconds,0,0,imgObj.seconds.width,imgObj.seconds.height,destXS,destYS,sizeMessage.seconds.width,sizeMessage.seconds.height);
        s = setTimeout(SeRotate,1000);
    }*/
   /* /!*测试*!/
    function beginTime(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(imgObj.clock,0,0,imgObj.clock.width,imgObj.clock.height,0,0,canvas.width,canvas.height);
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate((Math.PI/180)*30);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        var destXS = canvas.width/2-sizeMessage.seconds.width/2,destYS= canvas.width/2-sizeMessage.seconds.height+sizeMessage.seconds.width/2;
        ctx.drawImage(imgObj.seconds,0,0,imgObj.seconds.width,imgObj.seconds.height,destXS,destYS,sizeMessage.seconds.width,sizeMessage.seconds.height);
    }*/
};