/**
 * Created by YK on 2018/1/16.
 */
/**
 *1、对于 对象 属性的特性的 补缺；包括六个 特性
 * 特别注意：一旦调用了Object.defineProperty方法之后，那些未定义的特性值除了configurable为false之外，其他都为false;
 *  （configurable(可配置性)、enumerable（可枚举性）、writable（可修改性）、value（属性的数据值）、两个方法 getter（读取属性）、setter（写入属性））
 *
 *    修改 对象属性 特性的方法：
 *    修改单一属性：
 *    Object.defineProperty(object,"key",{
 *      修改的特性
 *    });
 *    修改多个属性：
 *    Object.defineProperties(object,{
 *      key:{修改的特性}
 *      key:{修改的特性}
 *      ...
 *    });
 *
 *    获取 属性的特性
 *    Object.getOwnPropertyDescriptor(object,"key");
 *
 *   I、对于 enumerable 来说，就是指在 枚举能否枚举到他，主要影响三个
 *      1）for in 遍历对象，会遍历 原型链上的 属性
 *      2）JSON.stringify() 转换成 json，只会转换对象本身的 可枚举 属性，不能转换原型链上 和 不可枚举属性
 *      3）Object.keys() 方法只能 获取 对象本身的 可枚举 属性，不能获取原型链上 和 不可枚举属性
 *
 *   II、configurable:当且仅当这个属性描述符值为true时，该属性可能会改变，也可能会被从相应的对象删除。默认为false.如果用 define方法把他改为
 *   false后，不允许在修改为true,并且configurable 设置为 false后，其他的 配置项 也不允许进行修改了；
 *
 *   III、value:与属性有关的值。可以是任何有效的javascript值。默认为undefined.
 *
 *   IV、writable:true当且仅当可能用赋值运算符改变与属性相关的值。默认为false.
 */