/*
*es6
2018/1/5
    /*
    1、对于 new Array() 和 Array 的区别
    When Array is called as a function rather than as a constructor, it creates and initialises a new Array object. Thus the function call Array(…) is equivalent to the object creation expression new Array(…) with the same arguments.
    　　当数组作为函数调用而不是构造函数调用时，它会创建并初始化一个新的数组对象。因此当Array(...)和new Array(...)接收同样的参数时，它们是相同的。
    调用构造函数Array创建数组的方法

        技巧方法：快速创建一个数组元素相同  Array(4).fill(2); //[2,2,2,2]
                  快速创建一个数组元素各异 Array.of(1,2,3,4); //[1,2,3,4]
    2、把 对象的 属性 组成一个 数组
        Object.keys(对象);
        Object.assign(目标对象,资源对象...); http://blog.csdn.net/qq_30100043/article/details/53422657
            如果有相同的属性，后面的覆盖前面的；
            功能：
                对于浅赋值：
                数组的： let Arr = Array(4).fill(2);
                         let newArr = Arr.slice();
                对象的：
                  方法一：
                         let obj = {a:1,b:3};
                         let newObj = Object.assign({},obj,{b:4});//如果想改变某个值 ，就再加一个 obj
                  方法二：
                         let newObj = {..obj,b:4};

    3、增强的对象字面量
        三点特征：
             可以在对象字面量里面定义原型
             定义方法可以不用function关键字
             直接调用父类方法
         例子：
         var human = {
             breathe() {
                 console.log('breathing...');
             }
         };
         var worker = {
             __proto__: human, //设置此对象的原型为human,相当于继承human
             company: 'freelancer',
             work() {
                 console.log('working...');
             }
         };
         human.breathe();//输出 ‘breathing...’
         //调用继承来的breathe方法
         worker.breathe();//输出 ‘breathing...’

    4、对于 函数中 运用 ... 的语法糖
        不定参数：
            例子：
            function add(...x){
               	return x.reduce((m,n)=>m+n);
           }
           //传递任意个数的参数
           console.log(add(1,2,3));//输出：6
           console.log(add(1,2,3,4,5));//输出：15

        拓展参数：则是另一种形式的语法糖，它允许传递数组或者类数组直接做为函数的参数而不用通过apply。
            var people=['Wayou','John','Sherlock'];
            //sayHello函数本来接收三个单独的参数人妖，人二和人三
            function sayHello(people1,people2,people3){
                console.log(`Hello ${people1},${people2},${people3}`);
            }
            //但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
            sayHello(...people);//输出：Hello Wayou,John,Sherlock

            //而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
            sayHello.apply(null,people);//输出：Hello Wayou,John,Sherlock
    */
*/

/*
 对于 react 的介绍；
 2018/1/5
    /*
        快速创建一个项目：https://doc.react-china.org/docs/installation.html#creating-a-new-application
            npm install -g create-react-app
            create-react-app 项目名称
        印象：react 就是一个 js 库，减少 html 的 Dom 操作，加快 渲染 速度；
            引出了两种 扩展语法：
                jsx（js的扩展），虚拟dom （就是 react自己的 dom，最后渲染成 html的 dom 只是 跟新对应 的修改部分）
    */


*/