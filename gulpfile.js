let gulp = require('gulp'),
    browserSync = require('browser-sync'),
    gulpSass = require('gulp-sass'),
    gulpSourcemaps = require('gulp-sourcemaps')
    gulpImagemin = require('gulp-imagemin'),
    gulpUglify = require('gulp-uglify')
  ;


  // // TASKS - LIST

  gulp.task('watch', _task_Watch);
  gulp.task('browser-sync', _task_browserSync);
  gulp.task('styles', _task_gulpSass);
  gulp.task('imagemin', _task_gulpImagemin);
  gulp.task('uglify', _task_gulpUglify);

  gulp.task('default', gulp.series(gulp.parallel('styles', 'browser-sync', 'watch')));

  // // TASKS - FUNCTIONS

  function _task_gulpUglify() {
    return gulp.src('./source/scripts/maxwell.js')
    gulpUglify()
    .pipe(gulp.dest('./dist/scripts/'))
  }

  function _task_gulpImagemin() {
    return gulp.src('./source/images/**/**/**')
      .pipe(gulpImagemin())
      .pipe(gulp.dest('./dist/images/'))
  }

  function _task_gulpSass() {
    console.log('_task_gulpSass');
    return gulp.src('./source/sass/**/*.scss')
      .pipe(gulpSourcemaps.init())
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(gulpSass({outputStyle: 'compressed'}))
      .pipe(gulpSourcemaps.write())
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
  } 

  function _task_browserSync() {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
  }

  function _task_Watch() {
    gulp.watch("./source/scripts/**/*.js", gulp.parallel('uglify'), browserSync.reload);
    gulp.watch("./source/sass/**/*.scss", gulp.parallel('styles'), browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
  }