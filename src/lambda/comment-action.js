'use strict';

var request = require("request");

// populate environment variables locally.
require('dotenv').config()

// All calls to the Netlify API will need an auth token
var oauth_token = process.env.NETLIFY_TOKEN;


/*
  delete this submission via the api
*/
function purgeComment(id) {
  var url = "https://api.netlify.com/api/v1/submissions/" +id + "?access_token=" + oauth_token;
  request.delete(url, function(err, response, body){
    if(err){
      return console.log(err);
    } else {
      return console.log("Comment deleted from queue.");
    }
  });
}


/*
  Handle the lambda invocation
*/
export function handler(event, context, callback) {

console.log(event);

  // parse the payload
  var body = event.body.split("payload=")[1];
  var payload = JSON.parse(unescape(body));
  var method = payload.actions[0].name
  var id = payload.actions[0].value

  if(method == "delete") {
    purgeComment(id);
    callback(null, {
      statusCode: 200,
      body: "Comment deleted"
    });
  } else if (method == "approve"){

    // get the comment data fro the queue
    var url = "https://api.netlify.com/api/v1/submissions/" +id + "?access_token=" + oauth_token;

    request(url, function(err, response, body){
      if(!err && response.statusCode === 200){
        var data = JSON.parse(body).data;

        // now we have the data, let's massage it and post it to the approved form
        var approvedURL = "https://comment--hawksworx.netlify.com/thanks";
        var payload = {
          "form-name" : "approved-blog-comments",
          "path": data.path,
          "email": data.email,
          "name": data.name,
          "comment": data.comment,
          "submission-date": new Date().toString()
        };

        console.log("Posting to", approvedURL);
        console.log(payload);

        // post the comment to the approved lost
        request.post({'url':approvedURL, 'formData': payload }, function(err, httpResponse, body) {
          var msg;
          if (err) {
            msg = 'Post to approved comments failed:' + err;
            console.log(msg);
          } else {
            msg = 'Post to approved comments successful!  Server responded with:' + body;
            console.log(msg);
          }
          purgeComment(id);
          var msg = "Comment approved. Site deploying to include it.";
          callback(null, {
            statusCode: 200,
            body: msg
          })
          return console.log(msg);
        });
      }
    });

  }
}
