module.exports = {
	devtool:"eval-source-map",
	entry:{
		"./css/":__dirname+"/app/main1.css", //这种写法的好处是 对应的key能够当做output输出口的文件的路径存在，这样就上输出的文件可以灵活的在不同的位置
		"./public/":__dirname+"/app/main.js"
	},
	output:{
		path:__dirname,
		filename:"[name]bundle.js"
	},

	/*本地服务器*/
	 devServer: {
	    contentBase: "./public",//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,//不跳转
	    inline: true//实时刷新
  	},

  	module:{
  		rules:[
  			{
  				test:/\.css$/,
  				loader:'style-loader!css-loader'
  			}
  		]
  	}
}