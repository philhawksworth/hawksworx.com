'use strict';

// A standard Lambda function handler
export function handler(event, context, callback) {

  console.log('queryStringParameters :', JSON.stringify(event.queryStringParameters));

  // who's there?
  const  { name }  =  event.queryStringParameters ;

  // Say hello
  callback(null, {
    statusCode: 200,
    body: `Hello ${name}!`
  });

}

