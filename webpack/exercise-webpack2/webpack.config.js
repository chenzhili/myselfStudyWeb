/**
 * Created by YK on 2017/11/13.
 */
const webpack = require("webpack");
const cssExtract = require("extract-text-webpack-plugin");
const htmlExtract = require("html-webpack-plugin");
const path = require("path");

module.exports={
    // devtool: 'eval-source-map',
    entry:{
        //"css/style":path.join(__dirname,"src/css/style.css"), //这个为了把它单独隔离出来的css的入口文件
        //这个不要单独生成一个 js，这个最后需要 用插件的 提取成 单独的 css
        "js/vendor":path.join(__dirname,"src/js/index.js")
    },
    output:{
        path:path.join(__dirname,"build/"), //这里要注意，这个是所有文件的 起始相对位置
        filename:"[name].js",
        // chunkFilename:'[name].chunk.js' //对于 用这个做 按需加载的问题，不咋清楚
    },
    module:{
        rules:[
            // {
            //     test:/\.css$/ , // 这个是需要匹配的对应字符串的正则表达式
            //     loader:'style-loader!css-loader', //用于需要用到的外部模块加载
            //     exclude:/node_modules/ //不用匹配的文件或者文件夹
            // } ["css-loader","sass-loader"]
            {
                test:/\.(css|scss|sass)$/,
                use:cssExtract.extract({
                    fallback:"style-loader",
                    // loader: "css-loader?importLoaders=1!postcss-loader!sass-loader",
                    // loader执行顺序是从右到左：sass-loader -> postcss-loader -> css-loader
                    /*use:[
                        // {
                        //     loader: "css-loader",
                        //     options: {
                        //         // // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                        //         importLoaders: 2
                        //     }
                        // },

                        "css-loader",
                        'postcss-loader',
                        'sass-loader',
                    ]*/
                    use:"css-loader!postcss-loader!sass-loader"
                }),
                exclude:"/node_modules/"
            },
            /*简写方式*/
            /*{
                test:/\.(png|jpg|gif)$/,
                loader:"file-loader?name=img/[name].[ext]"
            },*/
            /*对图片操作，有了url-loader不需要file-loader了，前者是后者的 增强版*/
            {
                test:/\.(png|jpg|gif)$/,
                loader:"url-loader?limit=1024&name=[path][name].[ext]/"//&outputPath=img/&publicPath=img//&publicPath=build/这个可以用于 cdn 上的服务器地址，所有资源都会加上这个前缀
            },
            /*官方的完整点的*/
            /*{
                test:/\.(png|jpg|gif)$/,
                use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "img/[name].[ext]",
                                //emitFile:false  //默认情况下会发出一个文件，但是如果需要的话，可以禁用这个文件（例如，用于服务器端包）默认为 true，这个要多生成一个文件
                            }
                        }
                    ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:100,
                            name:"img/[name]"
                        }
                    }
                ]
            }*/
        ]
    },
    plugins:[
        new cssExtract("css/style.css"),
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
    }
};