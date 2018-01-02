/**
 * Created by YK on 2017/11/17.
 */
/*
* 配置多文件入口，包括多html，js，对于css没有关注
* */
let entry = require("./webpack.config/entry");
let plugins = require("./webpack.config/plugins");
const path = require("path");
const cssExtract = require("extract-text-webpack-plugin");
module.exports = {
    devtool: 'eval-source-map',
    entry:entry["entry"],
    output:{
        path:path.join(__dirname,"asset"),
        filename:"[name]"
    },
    module:{
        rules:[
            {
                test:/\.(css|scss|sass)$/,
                use:cssExtract.extract({
                    fallback:"style-loader",
                    use:"css-loader!postcss-loader!sass-loader"
                }),
                exclude:/node_modules/
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader:"url-loader?limit=1024&name=img/[name].[ext]/"
            },
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude:/node_modules/
            }
        ]
    },
    plugins:plugins["plugins"],
    /*本地服务器*/
    devServer: {
        contentBase: path.join(__dirname,"./asset"),//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        host:"localhost",
        port:8787,
        open:true
    }
};