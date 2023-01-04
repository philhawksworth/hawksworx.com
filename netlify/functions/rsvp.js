

import fetch from 'node-fetch';


exports.handler = async (event, context) => {
  const status = await fetch(
    `${process.env.URL}/.netlify/functions/emails/subscribed`,
    {
      headers: {
        "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
      },
      method: "POST",
      body: JSON.stringify({
        from: "Phil@netlify.com",
        to: "phawksworth@gmail.com",
        subject: "Testing locally",
        parameters: {
          name: "Phil"
        },
      }),
    }
  );

  console.log(status);
  

  return {
    statusCode: 200,
    body: "Email sent"
  };
};


