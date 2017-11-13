/**
 * Created by YK on 2017/11/13.
 */
let cssExtract = require("extract-text-webpack-plugin");
let htmlExtract = require("html-webpack-plugin");
let path = require("path");

module.exports={
    entry:{
        "./build/css/style":path.join(__dirname,"src/css/style.css"), //这个为了把它单独隔离出来的css的入口文件
        "./build/js/vendor":path.join(__dirname,"src/js/index.js")
    },
    output:{
        path:__dirname,
        filename:"[name].js"
    },
    module:{
        rules:[
            // {
            //     test:/\.css$/ , // 这个是需要匹配的对应字符串的正则表达式
            //     loader:'style-loader!css-loader', //用于需要用到的外部模块加载
            //     exclude:/node_modules/ //不用匹配的文件或者文件夹
            // }
            {
                test:/\.css$/,
                use:cssExtract.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                }),
                exclude:"/node_modules/"
            }
        ]
    },
    plugins:[
        new cssExtract("build/style.css"),
        new htmlExtract({
            filename:path.join(__dirname,"build/index.html"),
            template:path.join(__dirname,"index.html"),
            inject:"body",
            minify:{
                removeComments:true,
                collapseWhitespace:false
            }
        })
    ],
    /*本地服务器*/
    devServer: {
        contentBase: path.join(__dirname,"./build"),//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        host:"localhost",
        port:8787,
        open:true
    },
};