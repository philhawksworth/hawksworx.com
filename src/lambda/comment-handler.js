'use strict';

var request = require("request");
var oauth_token = process.env.NETLIFY_TOKEN;

export function handler(event, context, callback) {

  console.log(event.body);

  // get the id of the submission in question from the request
  var id = event.body.id;
  var email = event.body.email;
  var comment = event.body.body;

  console.log("-----------");
  console.log("id", id);
  console.log("email", email);
  console.log("comment", comment);

  // var url = "https://api.netlify.com/api/v1/submissions/" +id + "?access_token=" + oauth_token;
  // console.log("Requesting ", url);


  // // get the action we'll perform" [ delete | approve ]
  // var action = event.queryStringParameters['action'];

  // delete: delete this submission via the api

  // approve: post this comment to the approved comments form and let Netlify trigger a build to include it.



  callback(null, {
    statusCode: 200,
    body: JSON.stringify(event)
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

