var gulp        = require('gulp');
var gutil       = require('gulp-util');
var jshint      = require('gulp-jshint');
var uglify      = require('gulp-uglify');
var cssmin      = require('gulp-cssmin');
var shell       = require('gulp-shell');
var connect     = require('gulp-connect');
// var imagemin    = require('gulp-imagemin');
var yaml        = require('json2yaml');
var fs          = require('fs');
var http        = require('http');
var gravatar    = require('gravatar');
var runSequence = require('run-sequence');
var Twitter     = require('twitter');

// var htmlreplace = require('gulp-html-replace');

// load environment variables
require('dotenv').config()

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



// Ensure any config files make to the dist folder
gulp.task('configs', () =>
  gulp.src(['_redirects'])
    .pipe(gulp.dest('dist'))
);



// List the available tasks
gulp.task("tasks", function() {
  console.log("Available gulp tasks:");
  var t = Object.keys(gulp.tasks);
  for (var i = t.length - 1; i >= 0; i--) {
    console.log("  gulp", t[i]);
  }
});


// Get comments form Poole
gulp.task("get:comments", function() {

  console.log("Getting comments data");

  var token = process.env.NETLIFY_TOKEN;
  var formID = process.env.FORM_ID;

  var options = {
    hostname: 'api.netlify.com',
    port: 80,
    path: '/api/v1/forms/'+ formID +'/submissions?access_token=' + token,
    method: 'GET'
  };

  http.get(options, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var comments = JSON.parse(body);
      var formatted = [];
      var excluded = require('./comment-exclusions.js');

      // format the comments object into something friendly for saving and serving.
      for (var i = 0; i < comments.length; i++) {

        var thisComment = comments[i];

        // exclude any comments flagged for deletion (while Netlify don't support deleting submissions)
        if(!excluded[thisComment.id]) {

          var formattedComment = {};
          formattedComment._id = thisComment.id;
          formattedComment.created = thisComment.created_at;
          for(var field in thisComment.human_fields) {
            formattedComment[field.toLowerCase()] = thisComment.human_fields[field];
          }
          // add gravatar image links if available
          if(formattedComment.email) {
            formattedComment.avatar = gravatar.url(formattedComment.email, {s: '50', r: 'pg'});
          }
          formatted.push(formattedComment);
        }
      }

      // include legacy comments for Poole
      var oldComments = fs.readFileSync('./src/_data/comments-poole.yml', {'encoding': 'utf8'} );

      // convert the json to yaml and save it for jekyll to use.
      if(formatted.length){
        var ymlText = yaml.stringify(formatted) + oldComments;
      } else
      var ymlText = oldComments;
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


// Get the latest few tweets to include in some pages
gulp.task('get:tweets', function() {

  var client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: '',
    access_token_secret: ''
  });
  var params = {screen_name: 'philhawksworth', count: 20};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      var recentTweets = [];
      for(var tweet in tweets){
        var t = {
          text: tweets[tweet].text,
          url: "https://twitter.com/philhawksworth/status/" + tweets[tweet].id_str,
          date:  tweets[tweet].created_at,
        };
        // Not sharing direct mentions
        if(t.text.charAt(0) !== "@"){
          recentTweets.push(t);
        }
      }

      var ymlText = yaml.stringify(recentTweets)
      fs.writeFile('./src/_data/tweets.yml', ymlText, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Tweets data saved.");
        }
      });

    }
  });

});




// Build and optimise the site and serve it locally.
gulp.task('build', function(callback) {
  runSequence(
    'get:comments',
    'get:tweets',
    'jekyll',
    ['scripts', 'styles', 'configs'],
    callback
  );
});


// run a local server
gulp.task('serve', ['build'], function() {
  connect.server({
  root: paths.deploy,
  port: 8000,
  });
});


// The default task.
gulp.task('default', ['build']);
