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
2018/1/8
    /*
        1、这不是 es6，但是比较中要 对于 call,apply,bind的区别：
            都是 为了 改变 调用 函数 的 作用环境（作用是改变函数中的this指向）（就是 可以 强行 让 某一个 来调用这个方法）
            注意：bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
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
2018/1/8
    /*
        1、创建组件 可以通过 函数式 和 es6的类；
            es6 可以 用 状态(state) 来让组件 重新渲染，并且这个是 组件 的私有属性

            对于 状态的 要点：正确的使用状态
            1、不要直接更新状态
                不能直接用 : this.state.key = value（这种更新不了）构造函数是唯一能够初始化 this.state 的地方。
                api:是用 this.setState({
                                                key : value
                                            });
            2、状态更新可能是异步的 （setState中可以 用 函数来进行更新）
                // Wrong
                this.setState({
                  counter: this.state.counter + this.props.increment,
                });
                // Correct
                this.setState((prevState, props) => ({ //上一个 状态值
                  counter: prevState.counter + props.increment
                }));
                // Correct
                this.setState(function(prevState, props) {
                  return {
                    counter: prevState.counter + props.increment
                  };
                });
            3、状态更新合并 (可以在 任何地方调用 setSate 方法，改变其中的某一个 key，最后都会跟原始对比，只是改变对应的值，其他不会变)

            使用类就允许我们使用其它特性，例如局部状态、生命周期钩子
            有两个属性 是 react 里 实现的 props（对外组件进行通信的），state（状态改变，会重新渲染）
        2、对于事件处理中的this的理解；
            我认为，在 react 中 用 类 来 初始化组价，最后并没有 实例化 class，而是 把 class 当做一个 “方法” 来运行，所以导致 class 里的方法 不存在  指向 class 的 this（这里回到值 输出 undefined）
                而 在 angular2 中 用的 类，是通过 装饰器 把 类 实例化 了的(执行环境 就是当前 的 实例化对象)，所以 在 class 里 存在 class 方法的 this

            在 react 中的 解决 办法 三种：
            1、在 constructor 里 bind
                如： constructor(){
                    this.handleClick = this.handleClick.bind(this);
                }
            2、属性初始化器语法 （这个名字提出 https://doc.react-china.org/docs/handling-events.html）
                如：class Ex{
                   handleClick = ()=>{}  //这种写法
                }
            3、在回调函数 中 使用 箭头函数
                (缺点: 使用这个语法有个问题就是每次 组件 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属
                性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题)
                如：
                    class LoggingButton extends React.Component {
                      handleClick() {
                        console.log('this is:', this);
                      }

                      render() {
                        // This syntax ensures `this` is bound within handleClick
                        return (
                          <button onClick={(e) => this.handleClick(e)}> /*********这里***********/
                            Click me
                          </button>
                        );
                      }
                    }
        3、对于 事件中 传参 的写法 注意：
            一定要不要 这样写 <div onClick={this.handleClick(参数)}></div> //这种方式，会直接 当 表达式 直接执行
            两种写法：
                <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button> （这种写法的 e 是 显示 传入,传入位置的顺序自己定） （e 是 事件对象）
                <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button> （这个是 隐式的 传入，就是不用写出来, 传入方式是最后传入）

    */
2018/1/26
    1、组合的 运用场景，就是指 在 组件 也可以当做 一个 闭合的 标签使用，中间可以嵌套 子标签；
        I、就是通过 react 内置的 this.props.children 获取 里面的 子元素，统一 渲染到 dom 页面上，如果 不写 不会获取 子元素的内容
        II、在test.js中同时看到了一个 函数吧 React.Children 这个里面封装了 es5 中的 map 和 forEach 等 函数，来进行 遍历操作
        III、组合除了用 子元素的方式，还有如
            function SplitPane(props) {
              return (
                <div className="SplitPane">
                  <div className="SplitPane-left">
                    {props.left}
                  </div>
                  <div className="SplitPane-right">
                    {props.right}
                  </div>
                </div>
              );
            }

            function App() {
              return (
                <SplitPane
                  left={
                    <Contacts />
                  }
                  right={
                    <Chat />
                  } />
              );
            }

*/