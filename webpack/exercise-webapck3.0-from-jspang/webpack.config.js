const path = require("path");
const uglifyPlugin = require("uglifyjs-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");
module.exports = {
	entry:{
		entry:"./src/entry.js",
		entry2:"./src/entry2.js"
	},
	output:{
		path:path.resolve(__dirname,"dist"),
		filename:"[name].js"
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:["style-loader","css-loader"] //一定要注意书写顺序，先解析 css 里的语法，在是内联到html
			}
		]
	},
	plugins:[
		// new uglifyPlugin(),
		new htmlPlugin({
			minify:{
				removeAttributeQuotes:true,
				collapseWhitespace:true
			},
			template:"./src/index.html",
			hash:true
		})
	],
	devServer:{
		contentBase:path.resolve(__dirname,"dist"),
		host:"localhost",
		compress:true, //服务器压缩
		port:8787,
		open:true
	}
}