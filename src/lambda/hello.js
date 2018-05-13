'use strict';

// A standard Lambda function handler
export function handler(event, context, callback) {

  // who's there?
  const  { name }  =  event.queryStringParameters ;

  // Say hello
  callback(null, {
    statusCode: 200,
    body: `Hello ${name}!`
  });

}

