import { log } from "util";

'use strict';

var request = require("request");
var oauth_token = process.env.NETLIFY_TOKEN;


/*
  delete this submission via the api
*/
function purgeComment(id) {
  var url = "https://api.netlify.com/api/v1/submissions/" +id + "?access_token=" + oauth_token;
  request.delete(url, function(err, response, body){
    if(!err){
    //  callback(null, {
    //    statusCode: 200,
    //    body: "Comment deleted"
    //  })
      return console.log("Comment deleted from queue.");
    }
  });
}



export function handler(event, context, callback) {

  // parse the payload
  var body = event.body.split("payload=")[1];
  var payload = JSON.parse(unescape(body));
  var method = payload.actions[0].name
  var id = payload.actions[0].value

  console.log(method, id);

  if(method == "delete") {
    purgeComment(id);
    callback(null, {
      statusCode: 200,
      body: "Comment deleted"
    });
  } else if (method == "approve"){
    // approve: post this comment to the approved comments form and let Netlify trigger a build to include it.

    // get the comment data
    var url = "https://api.netlify.com/api/v1/submissions/" +id + "?access_token=" + oauth_token;
    request(url, function(err, response, body){
      if(!err && response.statusCode === 200){

        console.log(body);

        var data = JSON.parse(event.body);

        var approvedURL = "https://api.netlify.com/api/v1/submissions/" +id + "?access_token=" + oauth_token;
        var payload = {
          path: data.path,
          email: data.email,
          name: data.name,
          comment: data.comment
        };

        console.log(payload);

        // post the comment to the approved lost
        request.post({url:approvedURL, json: payload}, function(err, httpResponse, body) {
          var msg;
          if (err) {
            msg = 'Post to approved comments failed:' + err;
          } else {
            msg = 'Post to approved comments successful!  Server responded with:' + body;
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




    // var commentFormURL = "https://www.hawksworx.com/stubs/comments/thank-you";
    // var messagePayload = {
    //   path: "test-path",
    //   email: "test-email",
    //   name: "test-name",
    //   comment: "test-comment"
    // };
    // request.post({url:commentFormURL, json: messagePayload}, function(err, httpResponse, body) {
    //   var msg;
    //   if (err) {
    //     msg = 'Post to comment stash failed:' + err;
    //   } else {
    //     msg = 'Post to comment stash successful!  Server responded with:' + body;
    //   }
    //   callback(null, {
    //     statusCode: 200,
    //     body: "Comment approved. Site deploying to include it."
    //   })
    //   return console.log("Comment approved. Site deploying to include it.");
    // });

  }

}


  // get the action we'll perform" [ delete | approve ]
  // var action = event.queryStringParameters['action'];

