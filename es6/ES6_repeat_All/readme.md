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
2018/2/5
	1、对象的扩展
		I、对于属性的简写
			var a=1,b=1;
			var obj={a,b,fun(){return this.a+this.b};
			注意的点：
				1）属性名简写是以字符串的方式存在，所以对于用关键字用于做属性不会报错；
				2）如果是 Generator函数需要加个*
					例子：
						let obj={*m(){yield "hello world";}}
		II、属性名表达式
			es6中对于 属性的名字可以用表达式的方法进行表示用[]方式表示；
			1）属性名表达式和 属性简写不能同时使用
			2）属性表达式是一个对象时，最后会被编译成[object object];如果有多个对象，会被覆盖
		III、Object.is(); 相当于 全等比较
			注意：对于 Object.is(NaN,NaN);//true
					NaN === NaN //false
					Object.is(+0,-0);//false
					+0 === -0//true
		IV、Object.assign(目标对象,多个源对象...);
			I、目标对象：不能为 undefined和null，不然会报错
			II、源对象：只有为 字符串的时候才有效，并且转换成 数组对象的形式加入，其他如undefined，null，数值，布尔虽然不会报错，但是会跳过
			III、如果有多个同名属性，后面的覆盖前面的
			IV、拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
			V、这个函数是浅拷贝，对于 属性值 是一个 对象的时候只会拿到 他的引用
			常见用途：
				1）为对象添加属性
					class Fun{
						constructor(x,y){
							Object.assign(this,{x,y});//这里不是解构，而是对象属性名的简写
						}
					}
				2）为对象添加方法
					Object.assign(Fun.prototype,{
						fun1(){},
						fun2(){},
						.
						.
						.
					});
				**************重要的东西************
				3)克隆对象（只能浅克隆，不能克隆原型链）
					function clone(sourceObj){
						return Object.assign(sourceObj);
					}
					如果想深克隆，克隆原型链的东西
					引入：Object.create(obj);指定的原型对象及其属性去创建一个新的对象（就是把 obj 作为 当前创建的对象的 原型对象）
					function deepClone(sourceObj){
						let sourceProto = Object.getprototypeOf(sourceObj);
						return Object.assign(Object.create(sourceProto),sourceObj);
					}
			VI、由于 Object.assign();对于 属性值是一个 赋值函数或者 取值函数，只会把最后的结果给新对象；
				例子：
					const source = {
						get get1(){return 1},
						set set1(value){console.log(value);}
					}
					const target = Object.assign({},source);
				ES2017 引入了 Object.getOwnPropertyDescriptors(obj);方法（以前是Object.getOwnPropertyDescriptor(obj,属性名)）;
				解决上面的问题：
					const target = {};Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));
		V、对于for in 和 Object.keys()的区别；
			for in :只遍历对象自身的和继承的可枚举的属性。
			Object.keys():返回对象自身的所有可枚举的属性的键名。
			******注意：属性的遍历
			for in:循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
			
			Object.keys():返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

			Object.getOwnProperyNames(obj):返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名

			Object.getOwnPropertySymbols(obj):返回一个数组，包含对象自身的所有 Symbol 属性的键名。

			Reflect.ownKeys(obj):返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

			以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
			首先遍历所有数值键，按照数值升序排列。
			其次遍历所有字符串键，按照加入时间升序排列。
			最后遍历所有 Symbol 键，按照加入时间升序排列

			************
		VI、Object.getPrototypeOf(obj);获取 对象的原型
			Object.setPrototypeOf(obj, prototype);设置 对象的原型
			Object.create(原型对象);生成原型
		VII、super关键字，用在 对象中表示 原型对象
			1）不能单独的使用 如；console.log(super);会报错
			2）并且浏览器只能识别属性方法的简写方式
				形如： fun(){console.log(super.属性);}
		VIII、Object.keys(obj)、Object.values(obj)、Object.entries(obj) 跟数组的 差不多,这个返回的是一个 数组
		VIIII、ES2018退出 对象的扩展运算（...）
			1)结构赋值
				必须是最后一个参数，写在其他位置都要报错；
				这个也是浅拷贝，对于是属性值是对象，只是相同对象的引用；
			2)扩展运算符
				a、合并多个对象，跟Object.assign()行为一样
				let ab = {...a,...b};
				// 等同于
				let ab = Object.assign({}, a, b);
				b、后面可以跟表达式
					const obj = {
						...(x > 1 ? {a: 1} : {}),
						b: 2,
					};
				c、扩展运算符的参数对象之中，如果有取值函数get或者复制函数set，这个函数是会执行的。
				// 并不会抛出错误，因为 x 属性只是被定义，但没执行
				let aWithXGetter = {
					...a,
					get x() {
						throw new Error('not throw yet');
					}
				};

				// 会抛出错误，因为 x 属性被执行了
				let runtimeError = {
					...a,
					...{
						get x() {
						throw new Error('throw now');
						}
					}
				};
	2、Symbol类型 ：为了描述 值的独一无二型，用于对象的属性中比较多
		I、是一个原始类型的值
		II、相同的 描述的，但是也不相等；
			let s1 = Symbol("aa");//aa就是这个Symbol的描述
			let s2 = Symbol("aa");
			s1 == s2 //false
		III、Symbol不能与其他类型进行运算，但是Symbol可以显示的转换为 字符串 和 布尔值，不能转换为 数值；
		IV、Symbol.for(描述); 返回一个 Symbol的值
			这个API会在 全局中进行登记，如果 描述是一样的，就会一直引用相同的值；
			Symbol.for() 和 Symbol()的区别；
			都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值
			*********这里要 离开一个误区：
				以前我一直以为，
				Symbol("a") == Symbol.for("a");//其实是false
				Symbol()不在 内存里 没有登记的，不可能相等；
				如果想 对于一个Symbol的值进行复用，就用这个 Symbol.for();

			**********
		V、Symbol.keyFor(symbol值);返回 已经登记的 Symbol类型的描述；
		例子：
			let s1 = Symbol.for("foo");
			Symbol.keyFor(s1) // "foo"

			let s2 = Symbol("foo");
			Symbol.keyFor(s2) // undefined

		************ 模块的 singleton 模式（就是指的类，只会实例化一次，重复调用的 同一个实例，不会生成多个）
		const obj = Symbol("class");//比 Symbol.for();声明的好，因为本来不能让他在其他地方进行修改
		class A{
			fun(){return 1;}
		}
		if(!global[obj]){//gloabl指全局对象
			global[obj] = new A();
		}
		export default global[obj];//es6的写法
		module.exports = global[obj];//commonjs的写法
		*************
		**********要分清楚是 实例的方法还是构造函数的方法
		**********
		VI、内置的Symbol值
			1）Symbol.hasInstance
				调用 foo instanceof Foo,判断foo是不是Foo的实例时候，实际是在用
				Foo[Symbol.hasInstance](foo);方法
				他是Symbol的 静态方法
			2）Symbol.isConcatSpreadable:是一个Boolean值，表示该对象用于Array.prototype.concat()时，是否可以展开
				a、对于数组来说
				这个值默认为 undefined的，就和true的效果一样，可以展开；
				let arr1 = [1,3];
				[3,4].concat(arr1,"3")//[3, 4, 1, 3, "3"]
				arr1[Symbol.isConcatSpreadable] = false;
				[3,4].concat(arr1,"3")//[3, 4, Array(2), "3"]

				b、对于类数组对象，默认是不展开的，可以自己定义为true，让他打散 展开
					let obj = {0:1,1:2,length:2};
					obj[Symbol.isConcatSpreadable]//还是为undefined ，但是相当于 false
			3）Symbol.species ：属性指向一个构造函数，创建衍生对象时会使用该属性；
				构造函数内，默认这个属性是指向当前 构造函数的；实现：
				static get [Symbol.species](){return this;}
				以此，我们一个可以 return我们想return的；

				衍生对象，通过 一些 API 返回 的实例；如：
				class MyArray extends Array {
				}

				const a = new MyArray(1, 2, 3);
				const b = a.map(x => x);
				const c = a.filter(x => x > 1);
				//b，c就是 衍生对象
				b instanceof MyArray // true
				c instanceof MyArray // true
				用途：
				它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例
			4）Symbol.match:指向一个函数，当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值；（实例的方法，不是构造函数的静态方法）
			例子：
				String.prototype.match(regexp)
				// 等同于
				regexp[Symbol.match](this)

				class MyMatcher {
				[Symbol.match](string) {
					return 'hello world'.indexOf(string);
				}
				}

				'e'.match(new MyMatcher())//1;
			5)Symbol.replace指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值(实例的方法，与 match差不多)；但是接受两个参数；
			写法：str.replace(myObj,newValue);
			<=> myObj[Symbol.replace](str,newValue);
			例子：
				const x = {};
				x[Symbol.replace] = (...s) => console.log(s);

				'Hello'.replace(x, 'World') // ["Hello", "World"]
			6)Symbol.search :指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值(和 match 一样的行为)
			7）Symbol.split:指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值(和上面一样)

			8）Symbol.iterator:指向该对象的默认遍历器方法
				*****************
				注意：对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器；
				像 实例的 对象时不存在 Symbol.iterator方法的；
				***********
			9）Symbol.toPrimitive:指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值;
			********可以理解为 在进行算数运算时，不是有个隐士转换吗，这个对象属性就是做这个操作的
			如果不进行改写，就用内置的方法进行相应的操作，当然你也可以修改行为；
			***********

			Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

				Number：该场合需要转成数值
				String：该场合需要转成字符串
				Default：该场合可以转成数值，也可以转成字符串
			就是看当前执行的环境适合什么，都是小写的判断；
			10）Symbol.toStringTag
				指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型
				// 例一
				({[Symbol.toStringTag]: 'Foo'}.toString())
				// "[object Foo]"

				// 例二
				class Collection {
				get [Symbol.toStringTag]() {
					return 'xxx';
				}
				}
				let x = new Collection();
				Object.prototype.toString.call(x) // "[object xxx]"
			11）Symbol.unscopables
			指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除

2018/2/6
	1、Set和Map数据结构
		I、Set本事是一个构造函数，用于生成Set数据结构；
			用途：类似于数组，但是他的成员不会有重复值，可以用于对于数组进行去重；
			例子：var arr = [1,2,1,2,3,4,5];
			  arr = [...new Set(arr)]
			a、属性	
				size:set成员的数量
				constructor:set的构造函数
			b、操作方法：
				add(value)：添加某个值，返回 Set 结构本身。(这个说明可以链式添加 let set =new Set().add().add()...)
				delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
				has(value)：返回一个布尔值，表示该值是否为Set的成员。
				clear()：清除所有成员，没有返回值。
			c、遍历操作
				注意：Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用；
				Set结构是 只有一个成员可以叫做键值（可以说键名和键值完全一样）；

				i、keys()，values()，entries()跟数组方法一样
				ii、forEach() 跟数组的一样
			d、应用
				1、给数组去重
				2、实现 并集，交集，差集
				例子：
					let a = new Set([1, 2, 3]);
					let b = new Set([4, 3, 2]);

					// 并集
					let union = new Set([...a, ...b]);
					// Set {1, 2, 3, 4}

					// 交集
					let intersect = new Set([...a].filter(x => b.has(x)));
					// set {2, 3}

					// 差集
					let difference = new Set([...a].filter(x => !b.has(x)));
					// Set {1}
		II、WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
			1、WeakSet 的成员只能是对象，而不能是其他类型的值
			2、WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用（就是说 在看对象是否还被引用时不会考虑这里）并且不可遍历
			**********
			WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数
			********
				a、API
					add(),delete(),has();
		III、Map ：就是用于 对于对象的 属性可以不为字符串
		ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

			实例化 map是 可以传参数：
				1、Map 可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组
				2、其实参数不一定是数组只要是 有 Iterator 接口的，里面组成 键值的数组也行；
			****他的 key 是指 这个东西的引用个，特别对于引用对象来说，小心很多 不是同一个值
			let map = new Map();
			map.set([1],1);
			map.get([1]);//undefined
			***********
			IV、对应的API 和属性
				size、set(key,value)、get(key)、has(key)、delete(key)、clear()
			V、遍历的方法和 Set 一样的尿性；
		IV、WeakMap：与Map结构类似，也是用于生成键值对的集合。
			WeakMap与Map的区别有两点。

			首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
			其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
			
			********
			注意：WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
			一旦 键名引用的对象在其他 地方没有被引用，垃圾回收机制就会 清楚这个对象，从而 对应的键名和键值会 自动消失；
			*******
			I、他的操作没有遍历的操作了，不存在 keys，values，entries、size，并且不支持clear；
			只有 set、get、has、delete可用；
			II、WeakMap的用途
				1）DOM节点作为键名
				2）部署私有属性。
				const _counter = new WeakMap();
				const _action = new WeakMap();

				class Countdown {
				constructor(counter, action) {
					_counter.set(this, counter);
					_action.set(this, action);
				}
				dec() {
					let counter = _counter.get(this);
					if (counter < 1) return;
					counter--;
					_counter.set(this, counter);
					if (counter === 0) {
					_action.get(this)();
					}
				}
				}

				const c = new Countdown(2, () => console.log('DONE'));

				c.dec()
				c.dec()
				// DONE
2018/2/7
	1、Iterator 和 for of循环
		I、理解 Iterator；
			Iterator是为了 统一 遍历 数据结构而产生，就是可以用相同的接口去 处理不同的数据结构，包括 es6的Set、Map这种新的 数据结构；
			而 Iterator 接口 统一指向 数据的 Symbol.iterator 属性上面，他是一个方法返回一个遍历器；（遍历器是指 可以用 for of 这种返回遍历数据 消费的一个容器，就是用来承载 能够进行遍历的 数据容器；）
		II、在js中 内部已经实现了 Iterator的 数据结构：
			Array
			Map
			Set
			String
			TypedArray
			函数的 arguments 对象
			NodeList 对象
			注意：普通的 Object 并没有实现，需要的话可以 自己 去实现 Symbol.iterator 的方法；

		III、对于 类似数组的对象（键名是数值，有length属性的，二者都需要）
			可以 直接用 Array对 遍历器的实现就好了；
			例子：
				 let obj={
					 0:1,
					 1:2,
					 length:3,
					 [Symbol.iterator]:[][Symbol.iterator]
					 }
					 for(let i of obj){
						 console.log(i);/1 2 undefined
					 }
		***********
			有了遍历器接口，数据结构就可以用for...of循环遍历，也可以使用while循环遍历
		**********
		IV、默认调用 Iterator 接口的场合
			a、结构赋值：对数组和 Set 结构进行解构赋值时
			b、扩展运算符
				结论：只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组
			c、yield*
			d、其他场合
				for...of
				Array.from()
				Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
				Promise.all()
				Promise.race()
		V、判断一个 数据结构是否 实现了 Iterator接口
			用： typeof 数据结构[Symbol.iterator]
			为 "function" 说明 有 函数，但是不知道具体行为，但是这个可以判断 数据结构是否自带；
		VI、Iterator接口用 Generator 函数实现；
			let obj ={
				*[Symbol.iterator](){
					yield 1;
					yield 2;
					yield 3;
				}
			}
			console.log([...obj]);//[1,2,3]
		VII、遍历对象出了必须的 next方法，还有 return、throw方法（可选）；
			a、调用 return 方法是在，提前退出循环就会执行；（通常是因为出错，或者有break语句或continue语句）；
				break：return是在 break退出循环之前就执行了；
				continue：return是在所有训话结束后才执行，不是看到continue就执行；
				err：是在抛出错误之前执行；
			*********
			return函数必须返回对象
			***********
			b、throw这个需要跟 generator 配合使用
		VIII、for of的理解
			a、遍历数组的时候 for...in 和 for...of 的区别；
				for...in :是遍历 数组的索引的，并且可以识别索引不为数值的；
				for...of:是遍历 数组的值的，但是不能识别，索引不为 数值的值；
				例子：
					let arr=[1,2];
					arr["foo"]=3;
					for(let i in arr){
						console.log(i);//0 1 foo
					}
					for(let v of arr){
						console.log(v);//1 2
					}
		***********
			对于数组遍历：for..in 不合适，for循环 太复杂，用 forEach替换时，不能用 break、continue退出循环，从而用 for...of简单并且可以 退出循环
		**********
2018/3/21
	1、generator 函数（生成器函数）
		原理：在生成器函数中，执行时，只是生成一个 可 遍历的 函数；调用 next才是遍历 值；并且遍历是通过 遇到 yield 就会停止，并且会执行 yield紧跟着的表达式；
		I、对于 yield的用法
			1）只能在 generator中出现

			2）在另一个表达式中用到了，需要加上 圆括号

			3）yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号

		II、理解 yield表达式本身没有返回，下次 next的参数时上个 yield 表达式 的返回；（注意是 yield 表达式的返回）
			例子：
				function* foo(x) {
					var y = 2 * (yield (x + 1));
					var z = yield (y / 3);
					return (x + y + z);
				}
				var b = foo(5);
				b.next() // { value:6, done:false }
				b.next(12) // { value:8, done:false }
				b.next(13) // { value:42, done:true }
		III、生成器函数 用 () 返回的是一个 对应的 遍历器对象;可以通过 for of进行遍历；但是要注意 只会 遍历 done 为 false的，如果 done 为 true就会 停止遍历，并且遍历不包括 done 为true的；
			而实际 done 为 true，有两种情况
				1_就是 return 语句返回
				2_就是 没有 yiled 返回数据了

2018/4/1
	1、在 es7 中被纳入的 修饰器 函数的注意点：
		I、形如 @的，主要是为了 改变 你被 修饰的 东西的 行为；
		II、这个修饰 是就近修饰的，就是 定义了 @ 后，接近的 类或者 类 的 变量；
		**********
			注意：修饰器不能用于 函数，因为有函数申明提升的：
			修饰器函数：我认为是 立刻执行的，就是 立刻 改变 修饰东西 的 行为的；
			例子：目的是为了 改变 counter 的值 为 2；
			var counter = 0;

			function add() {
			counter++;
			};

			@add
			function foo() {
			}
			
			实际编译后的：
			function add() {
			counter++;
			};
			@add // 这里执行 add 对应的函数的时候，counter为NaN，执行到最后，才被赋值为 1；所以最后为1
			function foo(){}

			var counter;
			var add;

			counter =1;
		***************

2018/6/1
	1、对于一个表达式引发的问题：
		Function.prototype.apply.call(Math.floor,null,[1.22]);//1

		对于此可以这样理解：
		(Function.prototype.apply).call(Math.floor,null,[1.22]);

		call和apply都是临时借用传入的第一个参数对象的this；

		上面等价于：
			Math.floor.apply(null,[1.22]);
		等价于：
			window.Math.floor(1.22);//1

		这里当第一个参数 传入的是 null，undefined：
			传入null/undefined的时候将执行js全局对象浏览器中是window，其他环境是global


