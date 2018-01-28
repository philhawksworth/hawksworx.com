'use strict';

var request = require("request");

export function handler(event, context, callback) {

  // get the arguments from the notification
  var data = JSON.parse(event.body);

  // prepare call to the Slack API
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
        "callback_id": "comment-action",
        "actions": [
          {
            "type": "button",
            "text": "Approve comment",
            "name": "action",
            "value": "approve"
          },
          {
            "type": "button",
            "text": "Delete comment",
            "name": "action",
            "value": "delete"
          }
        ]
      }]
    };

    // post the notification to Slack
    request.post({url:slackURL, json: slackPayload}, function(err, httpResponse, body) {
      var msg;
      if (err) {
        msg = 'Post to Slack failed:' + err;
      } else {
        msg = 'Post to Slack successful!  Server responded with:' + body;
      }
      callback(null, {
        statusCode: 200,
        body: msg
      })
      return console.log(msg);
    });

}
