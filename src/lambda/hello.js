/**
 *  This is a serverless function  which runs in AWS Lambda.
 *  It is deployed via Netlify so that building, versioning
 *  and deploying is easier than it might be otherwise.
 *
 *  No need to configure AWS, just include a file like this in
 *  your code, and deploy as you would any other site on Netlify.
 *
 *  https://www.netlify.com/docs/functions/
 */

'use strict';


// A standard Lambda function handler
export function handler(event, context, callback) {

  // Who's there?
  const { name = "friend" } = event.queryStringParameters;

  // Say hello
  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `<html>Hello from a serverless
      <a href="https://github.com/philhawksworth/hawksworx.com/blob/master/src/lambda/hello.js">function</a>,
      <em>${name}!</em></html>`
  });

}
