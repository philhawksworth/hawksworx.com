'use strict';

var request = require("request");
var oauth_token = process.env.NETLIFY_TOKEN;


export function handler(event, context, callback) {

  // get the action we'll perform" [ delete | approve ]
  var action = event.queryStringParameters['action'];

  // get the id of the submission in question from the request
  var id = event.queryStringParameters['id'];


  // var url = "https://api.netlify.com/api/v1/submissions/" +id + "?access_token=" + oauth_token;
  console.log("Action: ", action, id);


  // delete: delete this submission via the api

  // approve: post this comment to the approved comments form and let Netlify trigger a build to include it.





  // request.post({url:slackURL, formData: slackPayload}, function optionalCallback(err, httpResponse, body) {
  //   if (err) {
  //     return console.error('upload failed:', err);
  //   }
  //   console.log('Upload successful!  Server responded with:', body);
  // });


  callback(null, {
    statusCode: 200,
    body: "Action: ", action, id
  })


  // go get it
  // request(url, function(err, response, body){
  //   if(!err && response.statusCode === 200){
  //     console.log("...we got a result");
  //     callback(null, {
  //       statusCode: 200,
  //       body: body
  //     })
  //   }
  // });
}

