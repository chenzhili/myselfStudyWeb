/**
 * Created by ASUS on 2017/8/1.
 */
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
const open = require("open");

var sourPaths = {
    cssSource:["css/*.css"],
    jsSource:["js/*.js"],
    imgSource:"img/*.jpg",
    htmlSource:"*.html",
    prod:"dist/"
};
gulp.task("html",function(){
    gulp.src(sourPaths.htmlSource)
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
gulp.task("js",function(){
    gulp.src(sourPaths.jsSource)
        .pipe($.concat("release.js"))
        /*.pipe($.uglify())*/
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
    gulp.watch(sourPaths.jsSource,["js"]);
    gulp.watch(sourPaths.imgSource,["img"]);
    gulp.watch(sourPaths.htmlSource,["html"]);
});
gulp.task("default",["server","watch"]);