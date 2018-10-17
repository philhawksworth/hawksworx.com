
const gulp    = require("gulp");
const sass    = require("gulp-sass");
const uglify  = require('gulp-uglify');
const concat  = require('gulp-concat');
const pump    = require('pump');


/*
  generate the css with sass
*/
gulp.task('css', function() {
  return gulp.src('./src/scss/main.scss')
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
gulp.task('scripts', function(done) {
  pump([
      gulp.src("./src/js/*.js", {base: './'}),
      concat('hawksworx.min.js'),
      uglify(),
      gulp.dest('./src/site/_includes/js')
    ],
    done()
  );
});



/*
  Watch folders for changess
*/
gulp.task("watch", gulp.parallel('css'), function() {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('css'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('scripts'));
});


/*
  Let's build this sucker.
*/
gulp.task('build', gulp.series(
  'css',
  'scripts'
));
