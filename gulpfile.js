var gulp = require('gulp');
// var git = require('gulp-git');
// var jshint = require('gulp-jshint');
// var mocha = require('gulp-mocha');
// var clean = require('gulp-clean');
// var rename = require('gulp-rename');
// var uglify = require('gulp-uglify');
// var size = require('gulp-size');


// gulp.task('lint', function () {
//   return gulp.src('./src/*.js')
//     .pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('jshint-stylish'));
// });

// gulp.task('mocha', function () {
//   gulp.src('./test/*.js')
//     .pipe(mocha({ reporter: 'list' }));
// });

// gulp.task('clean', function () {
//   return gulp.src('./dist', { read: false })
//     .pipe(clean());
// });

gulp.task('harp', function () {
  return require('child_process').spawn('harp', {
    stdio: 'inherit'
  });
});


// gulp.task('build', ['test', 'clean'], function () {
//   return gulp.src('./src/contra.js')
//     .pipe(gulp.dest('./dist'))
//     .pipe(rename('contra.min.js'))
//     .pipe(uglify())
//     .pipe(size())
//     .pipe(gulp.dest('./dist'));
// });



// gulp.task('deploy', ['jekyll'], function () {
//   var pkg = require('./package.json');
//   var v = 'v' + pkg.version;
//   var message = 'Release ' + v;

//   return gulp.src('./')
//     .pipe(git.commit(message))
//     .pipe(git.tag(v, message))
//     .pipe(git.push('origin', 'master', '--tags'))
//     .pipe(gulp.dest('./'));
// });



// gulp.task('npm', ['tag'], function (done) {
//   require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
//     .on('close', done);
// });

// gulp.task('test', ['lint', 'mocha']);
// gulp.task('ci', ['build']);
// gulp.task('release', ['npm']);
