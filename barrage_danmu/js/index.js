window.onload = function(){
  /*css3实现弹幕，当然完整版还需要 对数据的随机处理*/
  let container = document.getElementsByClassName("floor_container")[0];
  container.className = "floor_container barrage";
  let width = parseFloat(getComputedStyle(container).width);
  container.style.right = -width+"px";
  container.style.animationDuration = width*0.025+"s";
  /*用js实现弹幕*/
  /*let obj = {
    distance:"", //移动总长度
    duration:0, //每一步的时间
    step:0, //总步数
    stepDis:10, //一步的距离
  };
  let container2 = document.getElementsByClassName("floor_container2")[0];
  obj.distance = parseFloat(getComputedStyle(container2).width);
  obj.step = obj.distance/obj.stepDis;*/
  class Barrage{
    constructor(container2){
      this.distance = Math.abs(parseFloat(getComputedStyle(container2).width))+parseFloat(window.innerWidth);
      this.stepDis = 2;
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
      container2.style.right = parseFloat(container2.style.right) + this.stepDis + "px";
    }
  }
  let container2 = document.getElementsByClassName("floor_container2")[0];
  container2.style.right = -parseFloat(getComputedStyle(container2).width)+"px";
  let barrage = new Barrage(container2);
  barrage.init();
  getData().then(function(data){
    console.log(data);
  }).catch(function(err){
    console.log(err);
  });

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
