let gulp = require('gulp');
let browserSync = require('browser-sync');
let gulpSass = require('gulp-sass');
let gulpSourcemaps = require('gulp-sourcemaps');


  // // TASKS - LIST

  gulp.task('watch', _task_Watch);
  gulp.task('browser-sync', _task_browserSync);
  gulp.task('styles', _task_gulpSass);

  gulp.task('default', gulp.series(gulp.parallel('styles', 'browser-sync', 'watch')))

  // // TASKS - FUNCTIONS

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
    gulp.watch("./source/sass/**/*.scss", gulp.parallel('styles'), browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
  }