var gulp          = require("gulp");
var sass          = require("gulp-sass");
var autoprefixer  = require("gulp-autoprefixer");
var runSequence   = require('run-sequence');
var hash          = require("gulp-hash");
var del           = require("del");
var execFile      = require("child_process").execFile;
var Pageres       = require('pageres');




// Compile SCSS files to CSS
gulp.task("scss", function () {

  //Delete our old css files
  del(["themes/simple-starter/static/css/**/*"])

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
  // return gulp.src('public/**/card.html')
  var pageres = new Pageres({})
    .src('./dist/blog/ttfn-rga/card.html', ['800x140'], {scale: 2})
    .src('./dist/blog/isomorphic-rendering-on-the-jam-stack/card.html', ['800x140'], {scale: 2})
    .dest(__dirname)
    .run()
    .then(() => console.log('done'));
});



// Run a complete build
gulp.task("generate", function () {
  // del(["dist"]);
  return execFile('hugo', function (err, stdout, stderr) {
    console.log(stdout); // See Hugo output
  });
});



gulp.task('build', function(callback) {
  runSequence(
    'scss',
    'generate',
    callback
  );
});


// Set watch as default task
gulp.task("default", ["watch"]);
