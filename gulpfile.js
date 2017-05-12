var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var prefixer = require('autoprefixer');
var runSequence = require('run-sequence');

var config = {
    nodeDir: './node_modules',
    publicDir: './dist',
    scssDir: './scss'
};

gulp.task('scss', function() {
    return gulp.src(config.scssDir + '/skeleton.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        "includePaths": [
          config.nodeDir + "/normalize.css",
          config.nodeDir + "/bootstrap/scss"
        ]
    }))
    .pipe($.postcss([prefixer({browsers: ['last 1 version']})]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('min', function () {
  return gulp.src(config.publicDir + '/css/skeleton.css')
    .pipe($.cssmin())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('default', function(cb) {
    runSequence('scss', 'min', cb);
});

gulp.task('watch', ['default'], function (){
    gulp.watch(
        [
            config.scssDir + '/*.scss',
            config.scssDir + '/**/*.scss'
        ],
        ['default']);
});
