let gulp = require('gulp'),
    browserSync = require('browser-sync'),
    gulpSass = require('gulp-sass'),
    gulpSourcemaps = require('gulp-sourcemaps')
  ;


  // // TASKS - LIST

  gulp.task('default', ['styles', 'watch', 'browser-sync'])
  gulp.task('watch', _task_Watch);
  gulp.task('browser-sync', _task_browserSync);
  gulp.task('styles', _task_gulpSass);

  // // TASKS - FUNCTIONS

  function _task_gulpSass() {
    console.log('Estilos');
    return gulp.src('./source/sass/**/*.scss')
      .pipe(gulpSourcemaps.init())
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(gulpSourcemaps.write())
      .pipe(gulp.dest('./assets/css'))
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
    gulp.watch("./assets/sass/**/*.scss", ['styles'], browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
  }