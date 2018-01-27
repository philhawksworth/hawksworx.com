'use strict';

var request = require("request");
var oauth_token = process.env.NETLIFY_TOKEN;


export function handler(event, context, callback) {

  // get the id of the submission in question from the request
  var data = JSON.parse(event.body);

  console.log("-----------");
  console.log("id", data.id);
  console.log("email", data.email);
  console.log("comment", data.summary);

  var slackURL = process.env.SLACK_WEBHOOK_COMMENT_URL;
  var slackPayload = {
    "text": "New comment on hawksworx.com",
	  "attachments": [
		{
      "fallback": "Required plain-text summary of the attachment.",
      "color": "#36a64f",
      "author_name": data.email,
      "title": "Title of page commented",
      "title_link": "https://www/hawksworx.com/blog/commented-on",
      "text": data.summary
    },
    {
      "fallback": "Manage comments on https://www.hawksworx.com",
      "actions": [
        {
          "type": "button",
          "text": "Approve comment",
          "url": "https://www.hawksworx.com/.netlify/functions/comments-action?id=" & data.id & "&action=approve"
        },
		    {
          "type": "button",
          "text": "Delete comment",
          "url": "https://www.hawksworx.com/.netlify/functions/comments-action?id=" & data.id & "&action=delete"
        }
      ]
    }]
  };

  request.post(slackURL).form(slackPayload);



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

