var project = require('./_project.js');
var gulp    = require('gulp');

// Get the latest few tweets to include in some pages
gulp.task('debug', function() {
    console.log("commit");
    console.log(process.env.COMMIT_REF);
});
