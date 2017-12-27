exports.handler = function (event, context, callback) {

  console.log("got a request! I'm sending back the request headers now")
  console.log(event.headers)

  callback(null, {
      statusCode: 200,
      body: JSON.stringify(event.headers)
  });
}
