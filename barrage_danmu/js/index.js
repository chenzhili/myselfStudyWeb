window.onload = function(){
    /*css3实现弹幕，当然完整版还需要 对数据的随机处理*/
    function animationC3(containerFloor,key){
        let container_floor = document.getElementsByClassName(containerFloor)[0];
        container_floor.className = `floor_container${key} barrage`;
        let width = parseFloat(getComputedStyle(container_floor).width);
        container_floor.style.right = -width+"px";
        container_floor.style.animationDuration = width*0.025+"s"; 
    }
    /*js实现弹幕*/
    class Barrage{
        constructor(container,speed){
            this.container = container;
            this.distance = Math.abs(parseFloat(getComputedStyle(container).width))+parseFloat(window.innerWidth);
            this.stepDis = speed;
            this.step = Math.ceil(this.distance/this.stepDis);
            this.n = 0;
        }
        init(){
            this.begin(this);
        }
        begin(me){
            me = this;
            if(me.n == me.step)return;
            /*主要逻辑*/
            me.fun();
            me.n++;
            me.time = setTimeout(()=>{
                me.begin(me);
            },me.stepDis*25)
        }
        fun(){
            this.container.style.right = parseFloat(this.container.style.right) + this.stepDis + "px";
        }
    }

    /*模拟获取数据，进行完成测试*/
    let obj = {};
    getData().then(function(data){
        if(data.result){
            obj = data.data;
            // console.log(Object.keys(obj));
            let container = document.getElementsByClassName("container")[0];
            let fregment = document.createDocumentFragment();
            for(let key in obj){
                let div = document.createElement("div");
                div.className = "floor";
                let spanArray = "";
                if(obj[key].length){
                    for(let i=0;i<obj[key].length;i++){
                        spanArray += `<span>${obj[key][i]}</span>`
                    }
                }
                div.innerHTML = `<div class="floor_container${key}">${spanArray}</div>`;
                fregment.appendChild(div);
            }
            container.appendChild(fregment);
            /*进行弹幕播放*/
            for(let key in obj){
                /*css3实现弹幕，当然完整版还需要 对数据的随机处理*/
                // animationC3(`floor_container${key}`,key);
                /*js实现弹幕*/
                let speed = 0;
                if(key%2 == 0){
                    speed = 1;
                }else{
                    speed = 2;
                }
                let containerFloor = document.getElementsByClassName(`floor_container${key}`)[0];
                containerFloor.style.right = -parseFloat(getComputedStyle(containerFloor).width)+"px";
                let barrage = new Barrage(containerFloor,speed);
                barrage.init();
            }
        }
    }).catch(function(err){
        console.log(err);
    });
    /*用js 控制 keyframes*/
    //这里看清楚是 哪个对象 含有 deleteRule 和 insertRule 方法
    /*
    * document.styleSheets[0].deleteRule(index); 对应的 索引
    * document.styleSheets[0].insertRule("string样式",position); 也是对应的 索引
    * */
    function changeKeyframes(name,newCss,position){
        let styleSheets = document.styleSheets[0];
        /*这里有两种 , 分辨 keyframes 的用 name （就是 animation 的名字）,如果是普通的css 分辨通过 selectorText的值（对应的 选择器值 ）*/
        for(let i=0;i<styleSheets.cssRules.length;i++){
            if(styleSheets.cssRules[i].type == 7 && styleSheets.cssRules[i].name == name){
                styleSheets.deleteRule(i);
                styleSheets.insertRule(newCss,position);
            }
        }
    }
    changeKeyframes("try",`@keyframes try {  
    0% {
        transform :translateX(100%) scale(1);
        opacity:0;
    }
    100% {
        transform :translateX(100px) scale(2);
        opacity:1;
    }
}`,1);

    let animation = document.getElementById("animation");
    let aniTime;
    animation.addEventListener("click",(e)=>{
        // clearTimeout(aniTime);
        // document.body.style.animation = "inout";
        // document.body.style.animationDuration = "1s";
        // document.body.style.animationFillMode = "forwards";
        document.body.className = "in_out";
        aniTime = setTimeout(()=>{
            // document.body.style.animation = "";
            // document.body.style.animationDuration = "";
            // document.body.style.animationFillMode = "";
            document.body.className = "";
        },1000)
    });

    /*防抖（Debounce）和节流（throttle）都是用来控制某个函数在一定时间内执行多少次的技巧，两者相似而又不同*/
    //对应的网址：http://www.css88.com/archives/7010
    //连带这篇文章里的东西: https://juejin.im/entry/5a1f54bb51882554bd50d34e
    //连带 这个是 前端现在 从 框架=》打包=》代码管理=》语法检测=》业务逻辑检测 所有流行的框架 网址：http://www.css88.com/archives/7421
    //这个网址里的东西还要好好看看，这周六把
    /**
     * debounce：把触发非常频繁的事件（比如按键）合并成一次执行。
     * throttle：保证每 X 毫秒恒定的执行次数，比如每200ms检查下滚动位置，并触发 CSS 动画。
     * requestAnimationFrame：可替代 throttle ，函数需要重新计算和渲染屏幕上的元素时，想保证动画或变化的平滑性，可以用它。注意：IE9 不支持。
     */
    /*去抖动，就是对于像 监听滚动 事件 这种，每次发生会触发很多次，为了对触发事件进行控制*/
    let debounce = document.getElementsByClassName("debounce")[0];
    function debounceFun(fun,delay){
        let time = null;
        return function(){
            let content = this; //记得 this 的指向 永远是 真正调用的 环境
            clearTimeout(time);
            time = setTimeout(()=>{
                fun();
            },delay)
        }
    }
    /*setInterval(()=>{
        let timeOut = setInterval(()=>{
            console.log(1);
        },60);
        console.log(timeOut);
        clearInterval(timeOut);
    },60);*/
    let fun = function(){
        console.log("这是隔段时间的");
    };
    debounce.addEventListener("scroll",debounceFun(fun,1000));
};
let n = localStorage.getItem("n") || 0;
let u = navigator.userAgent, app = navigator.appVersion;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
console.log(n);
if(isAndroid){
    window.addEventListener("beforeunload",(e)=>{
     document.removeEventListener("visibilitychange",change);
     n++;
     localStorage.setItem("n",n);
     // e.stopPropagation();
     });
}
if(isiOS){
    window.addEventListener("unload",(e)=>{
        n++;
        localStorage.setItem("n",n);
        // e.stopPropagation();
    });
}
function change(){
    n++;
    localStorage.setItem("n",n);
    // e.stopPropagation();
}
document.addEventListener("visibilitychange",change);
/*ios上不识别 beforeunload 事件 ，只能识别 unload事件*/
/*android上 在刷新页面的时候，会识别 visibilitychange 和 bbeforeunload(unload)两个事件都会触发,ios 上不会触发visibilitychange事件*/
/*
//ios
window.addEventListener("unload",(e)=>{
    n++;
    localStorage.setItem("n",n);
    e.stopPropagation();
});
//android
window.addEventListener("beforeunload",(e)=>{
    document.removeEventListener("visibilitychange",change);
    n++;
    localStorage.setItem("n",n);
    e.stopPropagation();
});*/
/*请求接口*/
function getData(){
    return new Promise(function(resolve,reject){
        let xml = new XMLHttpRequest();
        xml.open("GET","json/adv.json",true);
        xml.send();
        xml.onreadystatechange = function(){
            if(xml.readyState == 4 && xml.status == 200){
                if(xml.responseText){
                    resolve({
                        result:1,
                        data:JSON.parse(xml.responseText),
                        mess:"获取数据成功"
                    });
                }else{
                    reject({
                        result:0,
                        message:"获取不到数据"
                    });
                }
            }
        };
    });
}