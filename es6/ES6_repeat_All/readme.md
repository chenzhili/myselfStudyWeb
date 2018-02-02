2018/1/15
1、配置环境
	用 bebel 对于 es6进行 转换
	一、安装
		npm install -g babel-cli
		npm install --save-dev babel-preset-es2015 babel-cli
		***这里的 babel-preset-es2015现在换成 babel-preset-env
	二、插件 .babelrc的文件
		简单配置
		{
			"presets":["es2015"],
			"plugins":[]
		}
2018/1/31
	1、解构赋值
		I、对于数组的解构
			1）可以设置默认值，但是对于 null，undefined要注意
				let [a,b=1,c=3]=[1,undefined,null];
				console.log(a+"_"+b+"_"+c);//1_1_null
		II、对象的解构
			原理：对于对象解构的完整写法：
				let {a:A,b:B}={a:2,b:45};
				*******前面的 的 属性 只是一个匹配模式，后面的才是赋值
				//这里的a ,b不存在， A为2 、B为45;
				缩写：{a,b}={a:1,b:2}; <=> {a:a,b:b}={a:1,b:2};
				//赋值的 是 a b
			1)对象解构没有顺序，根据 属性名字相同
			2)理解一个例子说明真的懂了，对象的解构赋值
				let obj = {
					p: [
						'Hello',
						{ y: 'World' }
					]
				};
				let { p, p: [x, { y }] } = obj;
			3)对于 将一个 已经声明的变量进行解构赋值要特别注意
				let x;
				{x}={x:1};
				//会报错
				在 js 引擎中 对于 像以 {} 开头，会编译成一个 代码块，不是 解构赋值
				这样写:
				({x}={x:1})
			4)对于 对象的解构赋值：
				I、由于 js 中 所有的 内置对象，都可以进行赋值，这个应用可以 简化操作
				如：
					let {log,cos,sin}=Math;
			5)数组为特殊的对象
				let {0:first,2:last}=[1,2,4];
				//first为1,last 4
		III、字符串的解构赋值
			例子：
			字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
			let [a,b,c,d]="world";
			//a为w,b为o,c为r,d为l
			特殊：let {length:len} = "abc";
			//len 为3
			//解释：解析为 类数组 后，为对象 上面的字符串为
				{
					0:"a",
					1:"b",
					2:"c",
					length:3	
				}
		IV、数值和布尔值的解构赋值
			原理：会把它当做 包装对象（引用对象） ，把对应的值转换为对应的对象，
			就像 对于 3.toString() 这种解释，在 引擎中 ，临时 引用 数值的 对象方法，把获取的值在返回；
			例子：
				let {toString:str}=123;
				//str就是 数值对应的引用对象的方法可以获取到
		******解构赋值的规则：
		只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
		例子：
			let { prop: x } = undefined; // TypeError
			let { prop: y } = null; // TypeError
			let {x=1,y=2}=undefined //TypeError
		*************
		v、函数参数的解构赋值
			1)理解清楚一个问题，传入的参数就是圆括号里的值，概念别混；
			例子：
				function fun([x,y]){return x+y;}
				这个的意思是，fun这个函数 传入的参数是一个 数组，只是传入参数时会 对其中的东西进行 解构了
			2)理解四个例子的意思：
				function fun1({x,y}){
					return [x,y];
				}
				function fun2({x=1,y=1}){
					return [x,y];
				}
				function fun3({x=1,y=1}={}){
					return [x,y];
				}
				function fun4({x,y}={x:1,y:1}){
					return [x,y];
				}
				****理解需要知道的知识点：
					let {a=1,b=1}={a:null,b:undefined};
					//a为null,b为1
					就是：
					null，undefined、，有值之间的关系；
					为null，就是把有值的 赋值为 null
					为undefined，就相当于 声明变量没有赋值
					为有值，就是赋值
				**************
				//情况1： fun();
					//原理 {x,y}=undefined 报错
					//原理 {x=1,y=1}=undefined 报错
					//原理 {x=1,y=1}=(在{}和undefined中选择 {}) [1,1]
					//原理 {x,y}=(在{x:1,y:1}和 undefined中选择前者) [1,1]
				//情况2: fun({});
					//[undefined,undefined]
					//[1,1]
					//[1,1]
					//[undefined,undefined]
		VI、解构赋值中的 圆括号问题
			1、只能在一种情况下可以用：
				*******不是声明变量部分的赋值语句的非模式部分，可以使用圆括号
				[(b)] = [3]; // 正确
				({ p: (d) } = {}); // 正确
				[(parseInt.prop)] = [3]; // 正确
				*********原因：
				因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。
				********
			2、不能使用的情况：
				1）变量声明语句
					就是有 let const var 标志的
				2）函数的参数
					相当于 变量声明
				3）赋值语句的模式不能
					数组而言：[] 标志就是模式
					对象而言：{p}={p:1} 第一个p就是模式
					例子：
						// 全部报错
						({ p: a }) = { p: 42 };
						([a]) = [5];
	2、扩展运算符和 rest运算符 （...）
		I、扩展运算符的场景:它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列
			1)对于对于 数组和对象的克隆而不是引用
				let arr1 = [1,2,4];
				let arr2 = [...arr1];
				arr1 != arr2的

		II、rest运算符：es6引入 rest 参数（形式为...变量名），用于获取函数的多余参数，以 数组的方式存在，并且 只能写在最后一个参数，不然会报错；
			1）作为函数的 不定参数
				例子：
					function fun(a,...arg){
						//a就是确实有的参数，arg才是不定参数，并且以 数组方式存在
						console.log(arg);
					}
	
2018/2/1
	1、字符串的扩展
		I、es6的字符串模板 (``);
		II、新增的api
			includes：返回Boolean值，表示在一个字符串是否存在另一个字符串的值；
			例子：
				let a="啊"
				let str="的设计费的看法啊打发"
				str.includes(a);//true
			startsWith:返回Boolean值,判断是不是以此开头
			endsWith:返回Boolean值，判断是否以此结尾
			repeat:返回新的str，重复的次数；
				注意：小数会 取整；
					 infinity和-1会报错
					 0到-1之间取整为0，就为空字符串
	2、数值的扩展
		I、二进制和八进制写法的更改
			es5中的 八进制是以 0开头的标志（在数值中）
			es6把 八进制 的 改成了 0o(0O) 大小写都行
			二进制写成 ： 0b(0B)
		I、新的api
			1）Number.isFinite() 和 Number.isNaN()
				****区别 全局的 isFinite() 和 isNaN()
				这个新的api 只对于 数值中，满足上面条件的为true，如果类型不是 直接返回false；
				而全局的 是 先把对应的 值用 Number()先转换了在比较
				*******
			2）ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
				Number.parseInt();
				Number.parseFloat();
			3)判断一个数是否为 整数 Number.isInteger(); 返回：Boolean值
				I、注意，他的判断是在精度上有偏差的
				注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判
				Number.isInteger(3.0000000000000002)//true
				上面代码中，Number.isInteger的参数明明不是整数，但是会返回true。原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了。
				II、注意 当值 小于了 Number 的最小计数值
				Number.MIN_VALUE()的时候，会被判为0
				Number.isInteger(5E-325) //true
		III、安全整数
			定义：就是在电脑的计数上，不能完全表示所有的数，只能够准确的表示某一个范围里的值；
			js中的 整数范围为 -2^53 ~ 2^53 之间（不包含两个点）
			最小：Number.MIN_SAFE_INTEGER (-2^53 - 1)
			最大：Number.MAX_SAFE_INTEGER ( 2^53 - 1)
			判断安全整数的 api:
			Number.isSafeInteger();
2018/2/2
	1、数组的扩展
		I、rest参数 和扩展运算符 都是 ...
			1）rest参数指的是 函数的 不定参数可以用此替代,是一个数据以 数组的方式 存在
				例子:function fun(a,...b){
					console.log(b);
				}
				fun(1,3,5);//[3,5]
			2)扩展运算符是把 数组或者存在 iterator接口的数据结构的数据，打散成单一的数据
			运用：
				a、复制数组
					let arr=[1,2,4];
					let copyArr = [...arr];//这个是新的数组不是引用了
				b、合并数组
					let arr1=[1,3];
					let arr2=[5,6];
					.
					.
					.
					let newArr = [...arr1,...arr2(这里可以多个)]
				c、与解构赋值结合
					获取除了第一个元素的，生成新的数组
					let arr=[1,2,4,5,5];
					let [a,...newArr] = arr;
		II、新的API
			1）Array.from():类似数组的对象（array-like object）和可遍历（iterable）的对象转换成真正的数组；
				a、与扩展运算符的 区别；
					扩展运算符：是对于 存在iterator接口的数据结构才能进行转换；因为他实际的实现是通过Symbol.iterator接口实现的

					这个API：只要有 length 属性特征的对象都能转换；
				b、还接受第二个参数，用法跟 map一样，会返回新的值给新数组；
				let obj={0:1,1:2,2:4,length:3};
				Array.from(obj,x=>x*x)//[1,4,16];
				c、对于 Unicode 字符的长度的问题；
					es5中 码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示；
					例子："\u20bb7"这个会被解析成
					"\u20bb"+7 =》length为 2
					es6中 可以用大括号括上正确的表示该字符；
					例子：
						"\u{20BB7}"//"𠮷"
						"\u20BB7"// " 7"
					*****这个API的应用
						可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug
						Array.from("\u{20BB7}").length;
						//1
						Array.from("\u20BB7").length;
						//2
						"\u{20BB7}".length //2
					********
			2)Array.of():用于将一组值，转换为数组。
				为了：弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
				Array() // []
				Array(3) // [, , ,]
				Array(3, 11, 8) // [3, 11, 8]
			3）arr.copyWithin(target,start,end);
			在数组内，将指定位置的成员覆盖其他位置，返回当前数组(start->end 是 含头不含尾)
				target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
				start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
				end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
			4）arr.find() 和 arr.findIndex(); 
				find:用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined
				findIndex：就是返回对应的 下标，没有满足的就返回 -1；
				注意：
					1、还有第二个参数，用于改变对应的 this执行环境；
					例子：
						function f(v){
							return v > this.age;
						}
						let person = {name: 'John', age: 20};
						[10, 12, 26, 15].find(f, person);    // 26
					2、这里引出了一个 能够判断 NaN === NaN的方法；
					Object.is();这个方法的 对比条件和 '==='是一样的，但是有个特殊
					NaN === NaN //false
					Object.is(NaN,NaN);//true
					+0 === -0 //true
					Object.is(+0,-0);//false
					[NaN].findIndex(v=>Object.is(NaN,v));//0
			5)arr.entries()、arr.keys()、arr.values()都是返回一个遍历器对象
				entries:返回键值
				keys:返回键
				values：返回值
				都可用for of 进行遍历
			6）es7的 方法 arr.includes(相应值);返回Boolean值，数组是否包含相应的值
			7）*********数组的空位*********
				这里一定要区分空位 != undefined；
				let arr = new Array(3);//这个就是空位，只有length属性，没有值
				arr[0]=undefined;//看到除了length属性，
				还有0；

				区别：有个 in 运算符
				in运算符是指：属性是否存在于对象中，如果存在，返回值为：true，对于数组来说，索引号 就是属性
					0 in [undefined, undefined, undefined] // true
					0 in [, , ,] // false
					上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。
				************es5 和es6 中api对于空位的处理：
				es5
				forEach(), filter(), reduce(), every() 和some()都会跳过空位。（跳过空位是指：忽略对空位的操作，不让他影响最后的结果）
				map()会跳过空位，但会保留这个值
				join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
				例子：
				// forEach方法
				[,'a'].forEach((x,i) => console.log(i)); // 1

				// filter方法
				['a',,'b'].filter(x => true) // ['a','b']

				// every方法
				[,'a'].every(x => x==='a') // true

				// reduce方法
				[1,,2].reduce((x,y) => return x+y) // 3

				// some方法
				[,'a'].some(x => x !== 'a') // false

				// map方法
				[,'a'].map(x => 1) // [,1]

				// join方法
				[,'a',undefined,null].join('#') // "#a##"

				// toString方法
				[,'a',undefined,null].toString() // ",a,,"

				es6:es6的API明确将空位 转为 undefined
				for of 遍历的时候也会视为 undefined
				*****************
	2、函数的扩展 包括 箭头函数
		I、获取函数的 必须传入的参数个数，不包括 有默认值，和rest参数的（...）
			例子：function fun(a,b,c=1,...d){
				return true;
			}
			console.log((function fun(a,b,c=1,...d){
				return true;
			}).length);//2
		II、箭头函数就是注意两个点
			1)就是在箭头函数中有一种情况省略了 return
			let fun = x=>x;
			<=> var fun = function(x){return x;}
			2)如果返回的是一个对象，或者写的是表达式的时候要加圆括号
			let fun= x => ({a:1,b:2});
			//这个表达式是看，字符串中数值出现的次数
			"sfds3df1fs".split("").reduce((prv,nex)=>(
				prv[nex]++ || (prv[nex]=1),prv
			),{});
			******如果有多个表达式，想省略 return的写法，
			就是在 ()用逗号分隔，只会返回最后一个；

