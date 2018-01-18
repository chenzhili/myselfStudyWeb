/**
 * Created by YK on 2018/1/18.
 */
/*劫持数据，在数据发生变化的时候,这是在控制器 里劫持数据变化，并没有放到 视图层*/
function observer(data){
    if(!data || typeof data != "object"){
        return;
    }
    Object.keys(data).forEach(key=>{
        observerProperty(data,key,data[key]);
    })
}
function observerProperty(obj,key,val){
    observer(val);
    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            return val;
        },
        set:function(newVal){
            if(val == newVal || (newVal != newVal)){
                return;
            }
            console.log(`数据更新了 ${val} => ${newVal}`);
            val = newVal;
            console.log(obj);
        }
    });
}

/*初始化页面指令，以及绑定的数据*/
function Compile(el,data){
    this.el = el.nodeType == 1?el:document.querySelector(el);
    this.data = data;
    this.initView(this.el);
}
Compile.prototype = {
  initView:function(el){
      let reg = /\{\{(.|\n)+?\}\}/g; //必须是懒惰模式，并且必须 加 g，所以 不能用https://zhuanlan.zhihu.com/p/27028242的做法，有问题
      // let loseKuoHao = /(\{\{)([\S\s]+)(\}\})/;//这个方法已经禁用了，在注释中
      let childNodes = el.childNodes;
      let me = this;
      [].slice.call(childNodes).forEach(key=>{
            let text = key.textContent;
            /*
            * 1、一种情况 key.nodeType 为 1 表示是个 元素，看他有没有 指令
            * 2、key.nodeType 为3 表示为 text就看他有没有 对应特征的变量 {{}}
            * */
            /*if(key.nodeType == 1){
            }
            if(text && reg.test(text)){
                Object.keys(me.data).forEach(item=>{
                    if(item == text.match(loseKuoHao)[2]){ //这里忽略了 如果 这个text是 {{}} {{}}多个 变量就会出问题
                        key.textContent = data[item];
                    }
                })
            }*/
            if(key.nodeType == 1){
                this.initView(key);
            }else if(key.nodeType == 3 && reg.test(text)){
                // key.textContent = this.data[RegExp.$1.trim()]; //这个获取属性 RegExp.$n ，有用前面 还需掉了 正则匹配才会有
            //    这个方法有问题，当有 几个只能匹配上一个
                let tempRegArr = text.match(reg);
                /*
                    当时的想法有问题，想去 匹配 所有值，用 分组来 替换 对应的 {{}} 这个东西的值，有问题
                let allStringReg = /^(([a-zA-Z ]*?)(\{\{[a-zA-Z0-9]+?\}\}))*$/;
                */
                let tempString = text;
                let tempObj = {};
                for(let i=0;i<tempRegArr.length;i++){
                    tempObj[tempRegArr[i]] = me.data[me.loseKuoHao(tempRegArr[i])];
                    tempString = tempString.replace(tempRegArr[i],tempObj[tempRegArr[i]]);
                }
                key.textContent = tempString;
                //这个只能显示数据，不能匹配出 空格
                /*key.textContent = "";
                for(let i=0;i<tempRegArr.length;i++){
                    key.textContent += me.data[me.loseKuoHao(tempRegArr[i])];
                }*/
            }
      });
  },
  //  用于匹配 {{}} 去除
  loseKuoHao:function(valItem){
      let reg = /(\{\{)([\S\s]+)(\}\})/;
      return valItem.match(reg)[2];
  }
};
let data = {a:5,b:3,c:34};
new Compile("#example",data);