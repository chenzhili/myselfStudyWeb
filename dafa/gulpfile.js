/**
 * Created by ASUS on 2017/8/1.
 */
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
const open = require("open");

var sourPaths = {
    cssSource:["css/*.css"],
    jsSource:["js/index.js","js/news.js","js/ajax.js"],
    imgSource:["img/*.jpg","img/*.png"],
    htmlSource:"*.html",
    prod:"dist/"
};
gulp.task("html",function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(sourPaths.htmlSource)
        .pipe($.htmlmin(options))
        .pipe(gulp.dest(sourPaths.prod))
        .pipe($.connect.reload());
});
gulp.task("css",function(){
    gulp.src(sourPaths.cssSource)
        .pipe($.concat("mian.css"))
        .pipe($.cssmin())
        .pipe(gulp.dest(sourPaths.prod))
        .pipe($.connect.reload());
});
gulp.task("jsRle",function(){
    gulp.src(sourPaths.jsSource[0])
        .pipe($.concat("release.js"))
        .pipe($.uglify())
        .pipe(gulp.dest(sourPaths.prod))
        .pipe($.connect.reload());
});
gulp.task("jsAjax",function(){
    gulp.src(sourPaths.jsSource[2])
        .pipe($.concat("ajax.js"))
        .pipe($.uglify())
        .pipe(gulp.dest(sourPaths.prod))
        .pipe($.connect.reload());
});
gulp.task("jsNews",function(){
    gulp.src(sourPaths.jsSource[1])
        .pipe($.concat("news.js"))
        .pipe($.uglify())
        .pipe(gulp.dest(sourPaths.prod))
        .pipe($.connect.reload());
});
gulp.task("img",function(){
    gulp.src(sourPaths.imgSource)
        .pipe($.imagemin())
        .pipe(gulp.dest(sourPaths.prod+"img/"))
        .pipe($.connect.reload()); 
});
gulp.task("server",function(){
    $.connect.server({
        root:"dist",
        livereload:true,
        port:8686
    });
    open('http://localhost:8686/index.html');
});
gulp.task("watch",function(){
    gulp.watch(sourPaths.cssSource,["css"]);
    gulp.watch(sourPaths.jsSource,["jsNews"]);
    gulp.watch(sourPaths.jsSource,["jsRle","jsAjax"]);
    gulp.watch(sourPaths.imgSource,["img"]);
    gulp.watch(sourPaths.htmlSource,["html"]);
});
gulp.task("default",["server","watch"]);