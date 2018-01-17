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