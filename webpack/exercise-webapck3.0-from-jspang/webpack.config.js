const path = require("path");
const glob = require("glob"); //用于处理多余css 轮询查找的 node模块

const uglifyPlugin = require("uglifyjs-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const purifycssPlugin = require("purifycss-webpack");
const copyPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");

/*对于 开发和生产环境并行开发的简单 实例*/
let publicPath;
console.log(encodeURIComponent(process.env.type));
if(!process.env.type){
	publicPath = "192.168.0.106";
}else{
	publicPath = process.env.type == "dev"?"192.168.0.106":"myself.com"; 
}

module.exports = {
	devtool:"eval-source-map",
	entry:{
		entry:"./src/entry.js",
		entry2:"./src/entry2.js",
		jquery:"jquery"
	},
	output:{
		path:path.resolve(__dirname,"dist"),
		filename:"[name].js",
		publicPath:`http://${publicPath}:8787/` //可以指定所有静态文件的 公共路径 （相当于就是服务器的绝对路径）
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				// use:["style-loader","css-loader"] //一定要注意书写顺序，先解析 css 里的语法，在是内联到html
				use: extractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader!postcss-loader"
		        })
			},
			{
				test:/\.(png|jpg|gif)$/i,
				use:[
					{
						loader:"url-loader",
						options:{
							limit:5000,
							// name:"[name].[ext]", // 这里最好不要去用 开发环境的名字，这样有混淆作用的
							/*
								name:"[imgs][name].[ext]", 这种写法虽然还是实现了在imgs文件夹下生成图片，但是在 图片引用的时候 路径会
								变成 [imgs]name.格式 所以不行
							*/
							outputPath:"imgs/" //图片输出的 总的 文件位置（相对位置）
						}
					}
				]
			},{
				test:/\.(htm|html)$/i,
				loader:"html-withimg-loader" //处理在 html中 的 图片的引用
			},
			{
				test:/\.less/,
				use:extractTextPlugin.extract({
					fallback:"style-loader",
					use:[
						{
							loader:"css-loader"
						},
						{
							loader:"less-loader"
						}
					]
				})
			},
			{
				test:/\.scss/,
				use:extractTextPlugin.extract({
					fallback:"style-loader",
					use:"css-loader!sass-loader"
				})
			},
			{
				test:/\.(js|jsx)$/,
				use:{
					loader:"babel-loader",
					// 提出到 .babelrc 文件中
					/*options:{
						presets:["env","react"]
					}*/
				},
				exclude:/node_modules/
			}
		]
	},
	plugins:[
		// new uglifyPlugin(),
		new htmlPlugin({
			minify:{
				removeAttributeQuotes:true,
				// collapseWhitespace:true
			},
			template:"./src/index.html",
			hash:true
		}),
		new extractTextPlugin("css/style.css"),
		new purifycssPlugin({
			paths:glob.sync(path.join(__dirname,'src/*.html'))   //这个插件很重要了，用于 减少体积，排除无用的 css
		}),
		new webpack.ProvidePlugin({
			$:"jquery"
		}),
		new webpack.BannerPlugin("this is a studying project"),
		new webpack.optimize.CommonsChunkPlugin({
			name:["jquery"],
			filename:"assets/js/[name].min.js",
			minChunks:2
		}),
		new copyPlugin([{
			from:"src/static_doc",
			to:"static"
		}])
	],
	devServer:{
		contentBase:path.resolve(__dirname,"dist"),
		host:publicPath,
		compress:true, //服务器压缩
		port:8787,
		open:true
	},
	watchOptions:{
		poll:1000,
		aggregateTimeout:500,
		ignored:/node_modules/
	}
}