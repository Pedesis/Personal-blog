var gulp = require('gulp');

less = require('gulp-less');

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('static/less/detial.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('static/css')); //将会在css下生成index.css
});

gulp.task('default',['testLess']);