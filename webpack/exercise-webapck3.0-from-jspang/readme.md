对于webpack的学习；
2018/1/15
	********注意一个问题，官方建议我们不要全局安装 webpack版本，因为编译的时候 默认优先用 全局
		在用局部的，所以导致如果webpack项目版本不一样的项目就会编译出错；
	*******
	1、用 live-server 插件进行 启动本地服务器 （配置个简单的服务器，在不用 gulp 、webpack之类的时候）
		npm install -g live-server

2018/1/16
	1、入口文件的配置说的太少了
	2、本地服务 和 热更新
		用 webpack-dev-server 需要安装 npm install --save-dev webpack-dev-server
		直接运行命令找不到 ，在 环境变量里 没有配置
		直接在 package.json中 配置对应的 命令就行了
	3、对于 原声 css的 处理，没用其他的 预处理器的时候
		用 loader 来进行 编译到 js中 需要
		style-loader css-loader
	4、压缩js的 另一种方法 （以前用的是 webpack 实例化  new webpack.optimize.UglifyJsPlugin()）
		const  uglify = require("uglifyjs-webpack-plugin");
		 在 plugins 在实例化 new uglify();
	 *****	这里出现了一个 问题 如果用 devServer 进行编译压缩 js 会导致报错*****
	 	*** 解答是说 ： 生产环境 和 开发环境 中 webpack 对于 js压缩 的思路不同***
	 	 生产环境能压缩 开发环境不许压缩
 	5、打包 html
 		插件用  html-webpack-plugin (这个比 4 是需要自己安装的)
 		npm install --save-dev html-webpack-plugin
 		const htmlPlugin = require("html-webpack-plugin");
 		new htmlPlugin({
 			minify:{
 				removeAttributeQuotes:true //省略 属性中的 引号
 			},
 			hash:true, //由于 浏览器会缓存 js ，有了 hash值，每次打包引用 就不会用 缓存的代码了
 			template:"当做模板HTML的路径"
 		});
2018/1/17
	1、对于图片在webpack中的处理
		用到的 loader： url-loader 和 file-loader
		url-loader是为了 生成 base64 的 内嵌 图片编码 **这个中 包含了 file-loader
		*******
		 (但是安装的时候 两者都要安装，可能是 引用了file-loader而已，代码不存在)
		 *****
		file-loader是为了 处理图片 的 路径引用，由于默认 编译的 图片名字会和 原名字不同
		{
		test:/\.(png|jpg|gif)/,
		use:[
			{
			loader:"url-loader",
			options:{
				limit:大小以 b 为单位,
				outputPath:imgs/ (输出到 哪个文件夹 下面)
		}
		}
		]
	}
	2、提取 css 为 单独的文件，并且解决 img 的引用问题 (通过在 输出口 加入 publicPath 指定 公共的 绝对路径引用 就可以了)
		plugin： extract-text-webpack-plugin 需要安装
		const extractTextPlugin = require("extract-text-webapck-plugin");
		new extractTextPlugin("生成的css路径")
	3、在html中 引入图片，导致编译时候不会编译对应的引入的图片
		由于 webpack 官网 不提倡 用 img 引入图片，所以导致这块有个盲区
		国内有个人开发了一个插件可以使用
		html-withimg-loader 来进行识别

2018/1/18
	1、less 文件的 打包编译 和 分离（主要是对于 提取css的写法，要理解不同的写法，并且用不同的写法写）
		*********一直有一个问题，就是把 css 分离成 多个文件，按需加载，没有实现******
		这个 less 需要 安装less 和 less-loader
		npm install less --save-dev 
		npm install less-loader --save-dev

	2、sass的扩展名 为 scss，编译 和 分离 独立的 文件
		npm install node-sass sass-loader --save-dev

	3、对于 c3 导致 浏览器兼容问题 加前缀的问题 postcss
		npm install postcss-loader autoprefixer --save-dev
		在项目根目录 添加 postcss.config.js
		
	4、消除 无用的 css （情况：可能为框架的，还有自己冗余的）
		purifycss 插件
		npm i -D purifycss-webpack purify-css 等价于
		npm install --save-dev purifycss-webpack purify-css

		const glob = require("glob");
		const purifyCssPlugin = require("purifycss-webpack");

		new purifyCssPlugin({
				paths:glob.sync(path.join(__dirname,'src/*.html'))
		})	
		*****purifyCssPlugin这个插件要依赖 extract-text-webpack-plugin下 才能成功
2018/1/21
	1、babel转换es6
		npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev
		官方说： babel-preset-es2015 过时了，并且不能转换 es7 es8
		提供了一个新的：
			npm install --save-dev babel-preset-env

			这就需要改：
			.babelrc
			{
				"presets":["react","env"]
			}

		webpack.config.js
		{
			test:/\.(js|jsx)$/,
			use:{
				loader:"babel-loader",
				//由于对于 babel的配置可能会有很多，最好别吧 options 配置在 webpack中，而是建立个新文件 .babelrc存放配置
				<!-- options:{
					presets:["es2015","react"]
				} -->
			},
			exclude:/node_modules/
		}
		.babelrc
		{
			"presets":["react","es2015"]
		}

	2、打包后的代码调试 （上线就不用了这个选项了）
		原理就是map对比；
		source-map 生成独立文件 map 打包比较慢 错误提示包括了 行 列
		cheap-module-source-map 独立文件 错误提示只有行
		eval-source-map 有安全隐患，生成map在 生成的文件不会生成独立文件（在入口文件里） 只在开发阶段用  错误提示包括了 行 列
		cheap-module-eval-source-map 跟上面的不同：错误提示只有列

	3、开发环境和生产环境的并行
		下载 package.json 生产环境的依赖包的命令为：
		npm install --production
		************ 一般放到 生产环境的依赖的包，都是属于在 正式项目中 代码需要依赖的库，比如局query，Vue，react等；打包依赖的loader和 plugin不需要放到生产环境，因为在打包好代码后，就没有用了；这个一定要区分好 不同的插件依赖在不同的环境下面******************
		在 package.json 中的 scripts中传值的写法：
		例子：
		package.js文件
			window下
			"build":"set type=build&webpack"
			mac或者 Linux
			"build":"export type=build&&webpack"
		webpack.config.js文件
			获取参数用node的写法：
			console.log(encodeURIComponent(process.env.type));
			if(process.env.type == "build"){
				//做在这个条件下的 打包编译
			}

	4、模块化配置
		应用就是 对于 将 开发环境和生产环境的 模块化以及 把 loader和plugins提出来都有用

	5、优雅打包第三方类库
		用jQuery练习
		两种方法：
			1、就是直接在入口的js中 以es6的语法直接 引用，但是对于架构者，不想去管这种 里面代码的问题用第二种
			2、用 插件的方式,ProvidePlugin插件，这个是webpack自带的插件
			const webpack = require("webpack");

			new webpack.ProvidePlugin({
				$:"jquery"
			})

	6、watch的正确使用方法
		webapck --watch的配置项在 webpack.config.js的配置

		watchOptions:{
			poll:1000,//检测修改的时间，一秒检测一次修改的问题件，以毫秒为单位
			aggregateTimeout:500,//就是防止 重复按 ctrl+s（保存）进行编译打包，导致资源消耗和速度减慢，这个就是在500毫秒的间隔只会一次打包，防止多次打包
			ignored:/node_modules/ //不检测的文件
		}
	7、对于 BannerPlugin 对于 打包文件可以追加一句注释，作为版权