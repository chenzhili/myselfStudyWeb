/**
 * Created by ASUS on 2017/8/1.
 */
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var sourPaths = {
    cssSource:["css/**/*.css","css/**/*.min.css"],
    jsSource:["js/jquery/jquery-2.1.4.min.js","js/*.js"],
    imgSource:"login/**/*.png",
    prod:"dist/"
};
gulp.task("css",function(){
    gulp.src(sourPaths.cssSource)
        .pipe($.concat("mian.css"))
        .pipe($.cssmin())
        .pipe(gulp.dest(sourPaths.prod));
});
gulp.task("js",function(){
    gulp.src(sourPaths.jsSource)
        .pipe($.concat("release.js"))
        .pipe($.uglify())
        .pipe(gulp.dest(sourPaths.prod));
});
gulp.task("img",function(){
    gulp.src(sourPaths.imgSource)
        .pipe($.imagemin())
        .pipe(gulp.dest(sourPaths.prod+"img/"))
});
gulp.task("watch",function(){
    gulp.watch(sourPaths.cssSource,["css"]);
    gulp.watch(sourPaths.jsSource,["js"]);
    gulp.watch(sourPaths.imgSource,["img"]);
});