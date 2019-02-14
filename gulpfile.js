var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var prefixer = require('autoprefixer');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

var config = {
    nodeDir: 'node_modules',
    publicDir: 'public',
    sourceDir: 'src'
};

gulp.task('styles', function () {
    return gulp.src(config.sourceDir + '/styles/*-theme.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({'includePaths': [ config.nodeDir ]}))
        .pipe($.postcss([prefixer({
            browsers: ['last 1 version']
        })]))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.publicDir + '/styles'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src(config.sourceDir + '/scripts/*.js')
      // .pipe(uglify('app.js', {
      //   compress: false,
      //   outSourceMap: true,
      // }))
      .pipe(gulp.dest(config.publicDir + '/scripts'));
  });

gulp.task('min', function () {
    return gulp.src(config.publicDir + '/styles/*-theme.css')
        .pipe($.cssmin())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.publicDir))
        .pipe(browserSync.stream());
});

// gulp.task('default', function (cb) {
//     runSequence('scss', 'min', cb);
// });

gulp.task('default', ['styles', 'scripts']);

// gulp.task('watch', ['default'], function () {
gulp.task('serve', ['styles', 'scripts'], function () {
    browserSync.init({
        server: {
          baseDir: './',
          index: "index.html"
        }
      });
    
    gulp.watch(config.sourceDir + '/styles/*.scss', ['styles']);
    gulp.watch(config.sourceDir + '/scripts/*.js', ['scripts']).on('change', browserSync.reload);
    gulp.watch('./index.html').on('change', browserSync.reload);
  

});