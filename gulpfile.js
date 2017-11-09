var gulp          = require("gulp");
var sass          = require("gulp-sass");
var autoprefixer  = require("gulp-autoprefixer");
var runSequence   = require('run-sequence');
var hash          = require("gulp-hash");
var clean         = require('gulp-clean');
var Pageres       = require('pageres');
var glob          = require('glob');
var path          = require('path');

// Delete our old css files
gulp.task('clean-css', function () {
  return gulp.src('themes/simple-starter/static/css/**/*', {read: false})
    .pipe(clean());
});

// cleanup the build output
gulp.task('clean-build', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});


// Compile SCSS files to CSS
gulp.task("scss", ['clean-css'], function () {

  //compile hashed css files
  gulp.src("src/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ["last 10 versions"]
    }))
    .pipe(hash())
    .pipe(gulp.dest("themes/simple-starter/static/css"))
    .pipe(hash.manifest("hash.json"))
    .pipe(gulp.dest("data/css"))
});


// Watch asset folder for changes
gulp.task("watch", ["scss"], function () {
  gulp.watch("src/scss/**/*", ["scss"])
});


// Generate social media assets
gulp.task("cards", function () {
  var files = glob.sync('dist/**/card.html');
  for (const file in files) {
    var p = path.dirname(files[file]);
    var name = p.replace(/\//g, '-');
    var name = name.replace("dist-","og-");
    var pageres = new Pageres({filename: name})
      .src(p+'/card.html', ['800x400'], {scale: 2})
      .dest(__dirname + "/dist/images/")
      .run()
  }
});


// Set watch as default task
gulp.task("default", ["watch"]);
