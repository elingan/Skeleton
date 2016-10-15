var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var config = {
    publicDir: './dist',
    scssDir: './scss'
};

gulp.task('scss', function() {
    return gulp.src(config.scssDir + '/skeleton.scss')
    .pipe($.sourcemaps.init())
    .pipe(sass({}))
    .pipe($.postcss([
        require('autoprefixer')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('min', function () {
  return gulp.src(config.publicDir + '/css/skeleton.css')
    .pipe($.csso())
    .pipe($.rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('default', function(cb) {
    runSequence('scss', 'min', cb);
});

gulp.task('watch', ['default'], function (){
    gulp.watch([config.scssDir + '/*.scss', config.scssDir + '/**/*.scss'], ['default']);
});
