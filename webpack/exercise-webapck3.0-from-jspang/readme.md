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