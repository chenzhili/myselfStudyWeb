/**
 * 1、今天 前同事 给了一个 表达式 ，用于 计算 字符中 字母出现的次数，里面很多东西需要关注；
 *      let str = "acedadec";
 *      let arrStr = str.split("");
 *      let output = arrStr.reduce((prev,next)=>(prev[next]++ || (prev[next] = 1),prev),{});
 *      I、箭头函数 中的 简写：
 *          let fun = (x,y)=>(x,y);  等价于 let fun = function(x,y){ x;return y;}
 *             x里可以跟不同的表达式，最后 函数 return y；
 *       II、reduce 数组 函数的用法 这是 es5里的；
 *          完整的  arr.reduce(callback,initialValue);
 *          1）如果 不写 initialValue，会以 数组第一个 项 作为 第一个 prev值，会少运行一次（比 设置了initialValue值的）
 *              例子： [1,2,3,4].reduce((function(previousValue,currentValue,currentIndex,array){
 *                     console.log(arguments);
 *              });
 *              第一个输出的 值 ：//Arguments(4) [1, 2, 1, Array(4), callee: ƒ, Symbol(Symbol.iterator): ƒ]
 *                      previousValue（上一次调用回调函数时的返回值，或者初始值）
                        currentValue（当前正在处理的数组元素）
                        currentIndex（当前正在处理的数组元素下标）
                        array（调用reduce()方法的数组）
            2）写了，第一次就以这个值 为 previousValue
                [1,2,3,4].reduce(function(){
                    console.log(arguments);
                },8);
                第一个输出的 值 ：//Arguments(4) [8, 1, 0, Array(4), callee: ƒ, Symbol(Symbol.iterator): ƒ]
 */