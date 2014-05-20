var gulp = require('gulp');
var git = require('gulp-git');
var jshint = require('gulp-jshint');

var paths = {
  source: 'src/',
  scripts: 'js/**/*.js',
  images: 'images/**/*',
  deploy: 'deploy/'
};


gulp.task('lint', function () {
  return gulp.src('./src/js/hawksworx.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});


// gulp.task('clean', function () {
//   return gulp.src('./dist', { read: false })
//     .pipe(clean());
// });

gulp.task('jekyll', function () {
  return require('child_process').spawn('jekyll', ['build'], {stdio: 'inherit'});
});



// lint js

// build jekyll

// concat js

// minify js

// replace js insert

// optim images
gulp.task('images', function() {
 return gulp.src(path.src + paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.deploy + paths/images));
});

//

// The default task
gulp.task('default', ['scripts', 'images', 'watch']);

