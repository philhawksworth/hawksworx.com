var gulp    = require('gulp');

gulp.task('get:data', [
  'get:tweets',
  'get:comments'
]);
