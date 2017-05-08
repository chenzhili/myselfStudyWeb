/*let dir = document.querySelector(".div");
let btn  = document.querySelector("button");
const a = 1;*/


/*构造函数*/
/*let f = ()=>{
    console.log(1+1);
};
btn.onclick =  () => {
  dir.innerHTML = `<p>${a}</p>`;
  carry.says(60);
  guruda.call("sdfd");
    console.log(Boolean(d == 1));
    console.log(Boolean(b == 2));
    console.log(Boolean(c == 3));
    console.log(obj);
    fun( "",[true,12]);
    f(0,...[1,2]);
};
class Name {
    constructor() {
        this.name = "tom";
    }
    says(age){
        console.log(`${this.name}年龄为${age}岁吗`);
    }
}
let carry = new Name();
class NameAo extends Name{
    constructor(){
      super();
      this.name = "curry";
    }
    call(call){
      this.says(call);
    }
}
let guruda = new NameAo();*/

/*解构*/
/*let [d,b,c]=[1,2,3];
let cat = "tom";
let dog = "lili";
let obj ={cat,dog};
function fun (x,...y){
  console.log(y.length);
  console.log(y);
}
function f(x,y){
  console.log(x);
  console.log(y);
  console.log(x+y);
  console.log(String(y));
}*/
/*对于变量赋值时的let和const*/
//1.let下的块级作用域中，不存在申明提前的说法了，并且不能进行重复申明
//2.const和let相似，但是对于他只能赋值一次

/*对于解构，数组解构和对象解构*///对于写法上不知道的 ([a,b]=[1,3]);  ({a,b} = {1,2})
//对于解构我不知道的
    //对于对象解构，可以给他换变量名 
    ({obj1:name,obj2:age}={obj1:"tom",obj2:"23"})
    console.log(name);
    console.log(age);
