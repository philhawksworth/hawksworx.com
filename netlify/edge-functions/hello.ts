export default async (request, context) => {

  context.log("Hello from an edge function");

  return new Response("Hello, World!", {
    headers: { "content-type": "text/html" },
  });
};
