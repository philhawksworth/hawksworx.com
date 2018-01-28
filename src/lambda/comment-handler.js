'use strict';

var request = require("request");

export function handler(event, context, callback) {

  // get the arguments from the notification
  var data = JSON.parse(event.body);

  console.log(data);

  // prepare call to the Slack API
  var slackURL = process.env.SLACK_WEBHOOK_COMMENT_URL;
  var slackPayload = {
    "text": "New comment on hawksworx.com",
	  "attachments": [
      {
        "fallback": "RNew comment on hawksworx.com",
        "color": "#444",
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
            "name": "approve",
            "value": data.id
          },
          {
            "type": "button",
            "style": "danger",
            "text": "Delete comment",
            "name": "delete",
            "value": data.id
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
