var project = require('./_project.js');
var gulp    = require('gulp');

/*
  Watch src folder for changes
*/
gulp.task("watch", function () {
  gulp.watch(project.buildSrc + "/js/**/*", ["scripts"]);
  gulp.watch(project.buildSrc + "/scss/**/*", ["styles"]);
  gulp.watch(project.buildSrc + "/site/**/*", ["generate"]);
});
