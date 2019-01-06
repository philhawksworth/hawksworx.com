
const gulp      = require("gulp");
const sass      = require("gulp-sass");
const uglify    = require('gulp-uglify');
const concat    = require('gulp-concat');



/*
  generate the css with sass
*/
gulp.task('css', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./src/site/_includes/css'));
});


/*
 Uglify our javascript files into one.
 Use pump to expose errors more usefully.
*/
gulp.task('js', function() {
  return gulp.src("./src/js/**/*.js")
    .pipe(concat('hawksworx.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./src/site/_includes/js'));
});


/*
  Watch folders for changess
*/
gulp.task("watch", function() {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('css'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
});


/*
  Let's build this sucker.
*/
gulp.task('build', gulp.parallel(
  'css',
  'js'
));
