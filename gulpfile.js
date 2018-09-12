
const gulp      = require("gulp");
const gulp      = require("gulp");
// const postcss   = require("gulp-postcss");
// const precss    = require('precss');
// const cssnano   = require('cssnano');


/**
 * Our gulp tasks live in their own files,
 * for the sake of clarity
 */
// require('require-dir')('./gulp-tasks');




/*
  generate the css with post css
*/
// gulp.task('css', function () {
//   return gulp.src('css/**/*.css')
//     .pipe(postcss([precss, cssnano] ))
//     .pipe(gulp.dest('site/_includes/css'));
// });

gulp.task('css', function() {
  return gulp.src('src/site/_scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('src/site/css'));
});



/*
  Watch folders for changess
*/
gulp.task("watch", function() {
  gulp.watch('src/site/_css/**/*.css', gulp.parallel('css'));
});


/*
  Let's build this sucker.
*/
gulp.task('build', gulp.series(
  'css'
));



/*
  default tasks
*/
gulp.task('default', ['build']);
