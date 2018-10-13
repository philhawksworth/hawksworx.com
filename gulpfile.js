
const gulp      = require("gulp");
const sass      = require("gulp-sass");


/*
  generate the css with sass
*/
gulp.task('css', function() {
  return gulp.src('./src/site/_scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./src/site/_includes/css'));
});


/*
  Watch folders for changess
*/
gulp.task("watch", function() {
  gulp.watch('./src/site/_scss/**/*.scss', gulp.parallel('css'));
});


/*
  Let's build this sucker.
*/
gulp.task('build', gulp.series(
  'css'
));
