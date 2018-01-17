/**
 * Created by YK on 2018/1/16.
 */
//2018/1/16
/**
 * 1、数字的补缺
 *  I、数字中不区分整数值和浮点数值，都是用“IEEE 754 标准定义的双精度64位格式”的浮点数 表示
 *      0.1+0.2 //0.30000000000000004
 *      0.1*0.2 //0.020000000000000004
 *  II、对于 全局内置 函数 parseInt 和 parseFloat 的用法（以及 Number()）
 *       parseInt 和 Number 都不会一直按照十进制计算，会根据传入值得特征来定；
 *       两个函数 Number(params); parseInt(params,几进制);（但是这个几进制，优先级低于 传入的参数对应的特征 比如：parseInt(011,10)，按照8进制来计算）；
 *       例子：
 *          parseInt("012"); //12
 parseInt(012); //10
 parseInt("012",8); //10
 如果是数值：0开头为八进制 ，0x开头为16进制，否则为10进制，书写规范的情况下
 如果为字符串：parseInt("0x12");//18 parseInt("012",8);//10

 parseFloat 只应用于 解析 十进制数字 （针对于 传入的值 为 浮点数，为整数还是可以解析 8 进制）
 III、把一个 字符串 数字 转换成 数字格式的方法 ,用 +，但是如果字符串中有解析不了的，就返回NaN
 +"343" //343
 +"32e"  //NaN
 *
 *
 */
//2018/1/17
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