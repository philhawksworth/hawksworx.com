var gulp        = require('gulp');
var gutil       = require('gulp-util');
var jshint      = require('gulp-jshint');
var uglify      = require('gulp-uglify');
var cssmin      = require('gulp-cssmin');
var shell       = require('gulp-shell');
var connect     = require('gulp-connect');
var imagemin    = require('gulp-imagemin');
var yaml        = require('json2yaml');
var fs          = require('fs');
var http        = require('http');
var gravatar    = require('gravatar');
// var htmlreplace = require('gulp-html-replace');


var paths = {
  source: '_site',
  deploy: 'dist'
};


// Minify and copy all JavaScript (except third party scripts)
// then concat the scripts
gulp.task('scripts', function() {

  // gulp.src('index.html')
  //   .pipe(htmlreplace({
  //     'js': 'js/hawksworx.min.js'
  // }));

  return gulp.src([paths.source + '/js/**/*.js', '!'+ paths.source + '/js/jquery.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest(paths.deploy + '/js/'));

});


// Minify and copy all CSS
gulp.task('styles', function() {
  return gulp.src(paths.source + '/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest(paths.deploy + '/css/'));
});


// lint the javascripts (except third party scripts)
gulp.task('lint', function () {
  return gulp.src([paths.source + '/js/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});


// build jekyll
gulp.task('jekyll', function() {
  return gulp.src('', {quiet: false})
    .pipe(shell([
      'rm -rf ' + paths.deploy,
      'jekyll build',
      'cp -R _site/ ' + paths.deploy
    ]));
});


// optim images
gulp.task('images', function() {
 return gulp.src(paths.src + '/images/**')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.deploy + '/images/'));
});


// List the available tasks
gulp.task("tasks", function() {
  console.log("Available gulp tasks:");
  var t = Object.keys(gulp.tasks);
  for (var i = t.length - 1; i >= 0; i--) {
    console.log("  gulp", t[i]);
  }
});


// task: comments

/*

- get json from comments service endpoint
- transform json to yaml and save to data dir
- build jekyll as normal

*/

gulp.task("comments", function() {
  console.log("Getting comments data");

  var options = {
    hostname: 'pooleapp.herokuapp.com',
    port: 80,
    path: '/data/ee2367e8-082d-11e4-8f63-16a76ac6964e.json',
    method: 'GET',
    auth: "pooleapp:sweet"
  };

  http.get(options, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
      var comments = JSON.parse(body);

      // add gravatar image links if available
      for (var i = 0; i < comments.sessions.length; i++) {
        comments.sessions[i].avatar = gravatar.url(comments.sessions[i].email, {s: '50', r: 'pg', d: '404'});
      }

      // convert the json to yaml and save it for jekyll to use.
      var ymlText = yaml.stringify(comments);
      fs.writeFile('./src/_data/comments.yml', ymlText, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Comments data saved.");
        }
      });

    });
  }).on('error', function(e) {
    console.log("Got error: ", e);
  });

});




// Build and optimise the site and serve it locally.
gulp.task('build', ['jekyll', 'scripts', 'styles', 'images']);


// deploy to gh-pages.
// Build, optimise, then push the dist subtree to gh-pages
gulp.task('deploy', shell.task([
  'git subtree push --prefix dist origin gh-pages'
]));


// run a local server
gulp.task('serve', ['build'], function() {
  connect.server({
  root: paths.deploy,
  port: 8000,
  });
});


// The default task.
gulp.task('default', ['build']);
