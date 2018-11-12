var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

var paths = {
  styles: {
    src: "src/scss/*.scss",
    dest: "src/css"
  }
};

// Compile sass into CSS & auto-inject into browsers

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}
// Static Server + watching scss/html files
function watch() {
  browserSync.init({
      server: "./src"
  });
  gulp.watch(paths.styles.src, styles);
  gulp.watch("src/*.html").on('change', browserSync.reload);
}


/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(styles, watch);

gulp.task('build', build);

gulp.task('default', build);
