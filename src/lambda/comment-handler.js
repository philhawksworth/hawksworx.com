'use strict';

var request = require("request");
var oauth_token = process.env.NETLIFY_TOKEN;


export function handler(event, context, callback) {

  // get the arguments from the notification
  var data = JSON.parse(event.body);

  var slackURL = process.env.SLACK_WEBHOOK_COMMENT_URL;
  console.log("-----------");
  console.log(slackURL);

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


    request.post({url:slackURL, json: slackPayload}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
    });



  // callback(null, {
  //   statusCode: 200,
  //   body: JSON.stringify(event)
  // })

}

