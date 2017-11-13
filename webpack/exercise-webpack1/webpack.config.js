let path = require("path");
let htmlExtract = require("html-webpack-plugin");
module.exports = {
	devtool:"eval-source-map",
	entry:{
		"./css/style":__dirname+"/app/main1.css", //这种写法的好处是 对应的key能够当做output输出口的文件的路径存在，这样就上输出的文件可以灵活的在不同的位置
		"./public/bundle":__dirname+"/app/main.js"
	},
	output:{
		path:__dirname,
		publicPath:"",
		filename:"[name].js",
		sourceMapFilename:"[name].source.js"
	},

	/*本地服务器*/
	 devServer: { 
	    contentBase: "./public",//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,//不跳转
	    inline: true,//实时刷新
	    host:"localhost",
	    port:8787

  	},

  	module:{ 
  		rules:[ //rules和loaders效果一样，但是现在3点几的版本用的是rules
  			{
  				test:/\.css$/,
  				loader:'style-loader!css-loader',
  				exclude:"/node_modules/"
  			}
  		]
  	},
	plugins:[
	 	new htmlExtract({
	 		filename:path.join(__dirname,"public/main.html"),
			template:path.join(__dirname,"public/index.html"),
			inject:"body",
			minify:{
                removeComments:true,
                collapseWhitespace:false
			}
		})
	]
}