//引入 gulp
var gulp = require('gulp');

//引入组件

//Prevent pipe breaking caused by errors from gulp plugins
var plumber = require('gulp-plumber');

//检查js编写
var jshint = require('gulp-jshint');

//编译SASS文件
var scss = require('gulp-scss');

//合并多个文件
var concat = require('gulp-concat');

//压缩JS文件
var uglify = require('gulp-uglify');

//压缩css文件
var miniCss = require('gulp-cssnano');

//文件重命名
var rename = require('gulp-rename');

// 检查js编写
gulp.task('lint', function() {
    gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('scss', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(scss())
        .pipe(gulp.dest('./dist/css')) //sass编译后的css文件存放位置
        .pipe(concat('ez.css'))
        .pipe(gulp.dest('./dist/css')) //未压缩的全局css文件
        .pipe(miniCss()) //压缩css文件
        .pipe(rename({
        	suffix:'.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('src/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});
//build任务
gulp.task('build',['lint','scss','scripts']);
// 默认任务
gulp.task('default', function(){

    // 监听文件变化
    gulp.watch('src/js/**/*.js',['lint','scripts']);
    // 监听文件变化
    gulp.watch('src/sass/**/*.scss',['scss']);
});