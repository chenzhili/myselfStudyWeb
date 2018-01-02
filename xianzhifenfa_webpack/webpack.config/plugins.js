/**
 * Created by YK on 2017/11/17.
 */
const utils = require("./utils");
const path = require("path");
const webpack = require("webpack");
const htmlExtract = require("html-webpack-plugin");
const cssExtract = require("extract-text-webpack-plugin");
/*获取所有的 html*/
let files = utils.getAllFiles(path.join(__dirname,"../src"),"html");
let html = utils.getEntry(files,[path.join(__dirname,"../src")+'/']);
let plugins = [
    new webpack.optimize.UglifyJsPlugin(), //这里要注意 对于 js文件 ，这个方法 识别不了 es6的语法
    new cssExtract("style.css")
];
for(let key in html){
    let opt = {
        filename:key,
        template:html[key],
        inject:false,
        minify:{
            removeComments:true,
            collapseWhitespace:false
        }
    };
    plugins.push(new htmlExtract(opt));
}
module.exports = {
    plugins:plugins
};