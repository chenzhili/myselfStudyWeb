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
    })
};

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