/**
 * Created by YK on 2017/8/22.
 */
/*时钟的初步试验完成了*/
/*
window.onload = function(){
    /!*时钟表盘的尺寸822px*822px, window.innerWidth/822 = i 得到系数
    时针 58*259 ，圆球直径 ：58
    分针 56*367 ，圆球直径 ：56
    秒针 48*328 , 圆球直径 ：48*!/
    /!*所有的img对象*!/
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
    /!*时分秒的定时器变量*!/
    var time;
    /!*每次旋转得度数*!/
    var deg = (Math.PI/180)*6;
    /!*测试promise.all来判断图片是否全部加载了*!///有问题，就promise只会执行一次，如果失败，就是败了，不会去重复获取
    var sizeMessage;
    /!*var obj = {
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
        });*!/
    /!*还是要用onload事件去轮训每一个图片，因为事件发生的时候，说明当前图片已经被缓存了*!/
    /!*用于判断图片是否加载完成*!/
    var imgOver = 0;
    for(var key in imgObj){
        imgObj[key].onload = function(){
            imgOver++;
            if(imgOver == 4){
                /!*尺寸信息*!/
                sizeMessage = getSizeMessage();
                /!*这里进行所有的操作*!/
                /!*initPaintImg();*!/
                /!*!/!*测试旋转*!/
                beginTime();*!/
                /!*时时获取时间*!/
                getTime();
            }
        }
    }
    /!*先获取基本的尺寸信息*!/
    function getSizeMessage(){
        /!*所有对象的对应的系数*!//!*width也是属于 球的直径*!/
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
    /!*对图片的初始化*!/
    function initPaintImg(){
        /!*表盘*!/
        ctx.drawImage(imgObj.clock,0,0,imgObj.clock.width,imgObj.clock.height,0,0,canvas.width,canvas.height);
       /!* /!*秒针*!/
        var destXS = canvas.width/2-sizeMessage.seconds.width/2,destYS= canvas.width/2-sizeMessage.seconds.height+sizeMessage.seconds.width/2;
        ctx.drawImage(imgObj.seconds,0,0,imgObj.seconds.width,imgObj.seconds.height,destXS,destYS,sizeMessage.seconds.width,sizeMessage.seconds.height);
        /!*分针*!/
        var destXM = canvas.width/2-sizeMessage.minutes.width/2,destYM = canvas.width/2-sizeMessage.minutes.height+sizeMessage.minutes.width/2;
        ctx.drawImage(imgObj.minutes,0,0,imgObj.minutes.width,imgObj.minutes.height,destXM,destYM,sizeMessage.minutes.width,sizeMessage.minutes.height);
        /!*时针*!/
        var destXH = canvas.width/2-sizeMessage.hours.width/2,destYH = canvas.width/2-sizeMessage.hours.height+sizeMessage.hours.width/2;
        ctx.drawImage(imgObj.hours,0,0,imgObj.hours.width,imgObj.hours.height,destXH,destYH,sizeMessage.hours.width,sizeMessage.hours.height);*!/
    }
    /!*思路应该是，每隔一秒去获取时间，然后画图，就可以了*!/
    function getTime(){
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(imgObj.clock,0,0,imgObj.clock.width,imgObj.clock.height,0,0,canvas.width,canvas.height);
        paintSeconds(seconds);
        paintMinutes(minutes);
        paintHours(hours);
        time = setTimeout(getTime,1000)
    }
    /!*绘制秒针*!/
    function paintSeconds(s){
        s = s == "0"?60:s;
        ctx.save(); /!*这个是为了保存在这之前的画布状态*!/
        /!*目的是为了，当对canvas进行旋转，缩放之类的影响整个画布的情况下，为了不影响其他绘画上的组件，进行的操作*!/
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(deg*s);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        var destXS = canvas.width/2-sizeMessage.seconds.width/2,destYS= canvas.width/2-sizeMessage.seconds.height+sizeMessage.seconds.width/2;
        ctx.drawImage(imgObj.seconds,0,0,imgObj.seconds.width,imgObj.seconds.height,destXS,destYS,sizeMessage.seconds.width,sizeMessage.seconds.height);
        ctx.restore();/!*上面操作完了，把save中保存的状态取出来*!/
    }
    /!*绘制分针*!/
    function paintMinutes(m){
        m = m =="0"?60:m;
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(deg*m);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        var destXM = canvas.width/2-sizeMessage.minutes.width/2,destYM = canvas.width/2-sizeMessage.minutes.height+sizeMessage.minutes.width/2;
        ctx.drawImage(imgObj.minutes,0,0,imgObj.minutes.width,imgObj.minutes.height,destXM,destYM,sizeMessage.minutes.width,sizeMessage.minutes.height);
        ctx.restore();
    }
    /!*绘制时针*!/
    function paintHours(h){
        h = h == "0"?24:h;
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(Math.PI/180*h*30);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        var destXH = canvas.width/2-sizeMessage.hours.width/2,destYH = canvas.width/2-sizeMessage.hours.height+sizeMessage.hours.width/2;
        ctx.drawImage(imgObj.hours,0,0,imgObj.hours.width,imgObj.hours.height,destXH,destYH,sizeMessage.hours.width,sizeMessage.hours.height);
        ctx.restore();
    }
    /!*这种思路有问题*!/
    /!*function SeRotate(){
        /!*ctx.clearRect(0,0,canvas.width,canvas.height);*!/
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(deg);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        var destXS = canvas.width/2-sizeMessage.seconds.width/2,destYS= canvas.width/2-sizeMessage.seconds.height+sizeMessage.seconds.width/2;
        ctx.drawImage(imgObj.seconds,0,0,imgObj.seconds.width,imgObj.seconds.height,destXS,destYS,sizeMessage.seconds.width,sizeMessage.seconds.height);
        s = setTimeout(SeRotate,1000);
    }*!/
   /!* /!*测试*!/
    function beginTime(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(imgObj.clock,0,0,imgObj.clock.width,imgObj.clock.height,0,0,canvas.width,canvas.height);
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate((Math.PI/180)*30);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        var destXS = canvas.width/2-sizeMessage.seconds.width/2,destYS= canvas.width/2-sizeMessage.seconds.height+sizeMessage.seconds.width/2;
        ctx.drawImage(imgObj.seconds,0,0,imgObj.seconds.width,imgObj.seconds.height,destXS,destYS,sizeMessage.seconds.width,sizeMessage.seconds.height);
    }*!/
};*/
/*开始用原型对象进行封装*/
/*想引用这个，用commonjs的语法 或则 es6的 引用 把这个快 暴露（exports）出去*/
var Clock = (function(){
    /*定时器*/
    var time;
    /*图片的信息*/
    var imgMessage;
    function Clock(canvas,clockUrl,hoursUrl,minutesUrl,secondsUrl){
        this.canvas = canvas;
        this.clockUrl = clockUrl;
        this.hoursUrl = hoursUrl;
        this.minutesUrl = minutesUrl;
        this.secondsUrl = secondsUrl;
    }
    /*这个是触发函数*/
    Clock.prototype.initPainting = function(){
        var ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth;
        var imgObj = {
            clock:new Image(),
            hours:new Image(),
            minutes:new Image(),
            seconds:new Image()
        };
        imgObj.clock.src = this.clockUrl;
        imgObj.hours.src = this.hoursUrl;
        imgObj.minutes.src = this.minutesUrl;
        imgObj.seconds.src = this.secondsUrl;
        var imgNumber = 0;
        var me = this;
        for(var key in imgObj){
            imgObj[key].onload = function(){
                imgNumber++;
                if(imgNumber == 4){
                    /*进行初始化*/
                    imgMessage = getSizeMessage(imgObj,me.canvas);
                    /*绘图*/
                    currentTime(me.canvas,imgObj,ctx,imgMessage);
                }
            }
        }
    };
    /*获取基本信息*/
    function getSizeMessage(imgObj,canvas){
        /*所有对象的对应的系数*//*width也是属于 球的直径*/
        var i = window.innerWidth/imgObj.clock.width;
        return {
            hours:{
                height:imgObj.hours.height*i,
                width:imgObj.hours.width*i,
                destX:canvas.width/2-imgObj.hours.width*i/2,
                destY:canvas.width/2-imgObj.hours.height*i+imgObj.hours.width*i/2
            },
            minutes:{
                height:imgObj.minutes.height*i,
                width:imgObj.minutes.width*i,
                destX:canvas.width/2-imgObj.minutes.width*i/2,
                destY:canvas.width/2-imgObj.minutes.height*i+imgObj.minutes.width*i/2
            },
            seconds:{
                height:imgObj.seconds.height*i,
                width:imgObj.seconds.width*i,
                destX:canvas.width/2-imgObj.seconds.width*i/2,
                destY:canvas.width/2-imgObj.seconds.height*i+imgObj.seconds.width*i/2
            }
        };
    }
    /*开始获取当前时间*/
    function currentTime(canvas,imgObj,ctx,imgMessage){
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(imgObj.clock,0,0,imgObj.clock.width,imgObj.clock.height,0,0,canvas.width,canvas.height);
        paintSeconds(seconds,ctx,canvas,imgMessage,imgObj);
        paintMinutes(minutes,ctx,canvas,imgMessage,imgObj);
        paintHours(hours,ctx,canvas,imgMessage,imgObj);
        /*time = setTimeout(currentTime,1000)*/ /*这个写法有问题，这里自调的时候，这里没有进行传参,currentTime这个函数的所有参数都没传，所以全是undefined*/
        time = setTimeout(function(){
            currentTime(canvas,imgObj,ctx,imgMessage);
        },1000)
    }
    /*绘制秒针*/
    function paintSeconds(s,ctx,canvas,imgMessage,imgObj){
        s = s == "0"?60:s;
        ctx.save(); /*这个是为了保存在这之前的画布状态*/
        /*目的是为了，当对canvas进行旋转，缩放之类的影响整个画布的情况下，为了不影响其他绘画上的组件，进行的操作*/
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(Math.PI/180*6*s);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        ctx.drawImage(imgObj.seconds,0,0,imgObj.seconds.width,imgObj.seconds.height,imgMessage.seconds.destX,imgMessage.seconds.destY,imgMessage.seconds.width,imgMessage.seconds.height);
        ctx.restore();/*上面操作完了，把save中保存的状态取出来*/
    }
    /*绘制分针*/
    function paintMinutes(m,ctx,canvas,imgMessage,imgObj){
        m = m =="0"?60:m;
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(Math.PI/180*6*m);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        ctx.drawImage(imgObj.minutes,0,0,imgObj.minutes.width,imgObj.minutes.height,imgMessage.minutes.destX,imgMessage.minutes.destY,imgMessage.minutes.width,imgMessage.minutes.height);
        ctx.restore();
    }
    /*绘制时针*/
    function paintHours(h,ctx,canvas,imgMessage,imgObj){
        h = h == "0"?24:h;
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(Math.PI/180*h*30);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        ctx.drawImage(imgObj.hours,0,0,imgObj.hours.width,imgObj.hours.height,imgMessage.hours.destX,imgMessage.hours.destY,imgMessage.hours.width,imgMessage.hours.height);
        ctx.restore();
    }
    return Clock;
})();
window.onload = function(){
    var clock = new Clock(document.getElementById("canvas"),"img/clock.png","img/h.png","img/m.png","img/s.png");
    clock.initPainting();
};
/*顺便没事加强自己对git，命令行提交的技能补充*/
/*  地址 ：http://www.jianshu.com/p/072587b47515
    还有就是 克隆 远程仓库 ：
    git clone <远程仓库地址> 
    一般git到远程仓库分为3个步骤：
    1、将工作区修改的文件让git进行管理，放到暂存区域  git add . （把所有更改的文件让git管理）
    2、将暂存区域的内容提交到本地仓库 git commit -m "这里是提交的信息，用英文"
    3、将本地仓库提交到远程仓库 git push <远程分支>   (写法 ：git push origin(远程) master(分支)) **一种情形强行推送，不管又冲突没 git push <远程> --force
        推送所有分支到远程 git push <远程> --all
    **** 当然还有很多其他的，关于 分支、回滚、分支合并之类的，其中的区别 都在 上面的地址里
    * 实验一遍 
 */