var gulp          = require("gulp");
var sass          = require("gulp-sass");
var autoprefixer  = require("gulp-autoprefixer");
var runSequence   = require('run-sequence');
var hash          = require("gulp-hash");
var clean         = require('gulp-clean');
var Pageres       = require('pageres');
var Twitter       = require('twitter');
var fs            = require('fs');
var yaml          = require('json2yaml');
var glob          = require('glob');
var path          = require('path');


// load environment variables
require('dotenv').config()


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



// Get the latest few tweets to include in some pages
gulp.task('get:tweets', function() {

  var client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: '',
    access_token_secret: ''
  });
  var params = {screen_name: 'philhawksworth', count: 50, exclude_replies: true};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {

      var recentTweets = {"recent" : []};
      for(const tweet in tweets) {
        var t = {
          text: tweets[tweet].text,
          url: "https://twitter.com/philhawksworth/status/" + tweets[tweet].id_str,
          date:  tweets[tweet].created_at,
        };
        recentTweets.recent.push(t);
      }

      var ymlText = yaml.stringify(recentTweets)
      fs.writeFile(__dirname + "/data/tweets.yml", ymlText, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Tweets data saved.");
        }
      });

    }
    else {
      console.log(error);
    }

  });

});



// Generate social media assets
gulp.task("cards", function () {
  var files = glob.sync('dist/**/card.html');
  for (const file in files) {
    var p = path.dirname(files[file]);
    var name = p.replace(/\//g, '-');
    var name = name.replace("dist-","og-") + "-";
    var pageres = new Pageres({filename: name})
      .src(p+'/card.html', ['800x400'], {scale: 2})
      .dest(__dirname + "/dist/images/")
      .run()
  }
  return;
});


// Set watch as default task
gulp.task("default", ["watch"]);
