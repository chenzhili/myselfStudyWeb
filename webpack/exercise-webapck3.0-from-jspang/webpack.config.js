const path = require("path");
const uglifyPlugin = require("uglifyjs-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry:{
		entry:"./src/entry.js",
		entry2:"./src/entry2.js"
	},
	output:{
		path:path.resolve(__dirname,"dist"),
		filename:"[name].js",
		publicPath:"http://192.168.0.106:8787/" //可以指定所有静态文件的 公共路径 （相当于就是服务器的绝对路径）
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				// use:["style-loader","css-loader"] //一定要注意书写顺序，先解析 css 里的语法，在是内联到html
				use: extractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader"
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
		new extractTextPlugin("css/style.css")
	],
	devServer:{
		contentBase:path.resolve(__dirname,"dist"),
		host:"192.168.0.106",
		compress:true, //服务器压缩
		port:8787,
		open:true
	}
}