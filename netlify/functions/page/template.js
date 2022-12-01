const inreply = function (post) {
  if (post.in_reply_to_status_id) {
    return `replying to <a href="https://twitter.com/${post.in_reply_to_screen_name}/status/${post.in_reply_to_status_id}">this from @${post.in_reply_to_screen_name}</a>`
  }
  return "";
}

const embedMedia = function (media) {
  let html = [];
    media.forEach(item => {
      html.push(`<img src="${item}" alt="Embedded image from Twitter" />`)
    });
    return html;
}




const formatDate = function (dateStamp) {
  const date = new Date(dateStamp);
  const month = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
  return `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`;
}


module.exports = (post) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="/main.css">
    <title>@philhawksworth said...</title>
  </head>
  <body>
  <div class="container">
  <div class="social-post">
  
  <a href="https://twitter.com/philhawksworth" class="avatar">
        <img src="/images/philhawksworth-goon.jpg" alt="A photo of Phil Hawksworth's face">
      </a>

      <div class="main">
        <div class="meta">
          <span class="author-name">Phil Hawksworth</span>
          <a href="https://twitter.com/philhawksworth" class="author-handle">@philhawksworth</a> &#8226;
          <time datetime="${post.created_at}"><a href="https://twitter.com/philhawksworth/status/${post.id}">${formatDate(post.created_at)}</a></time>
          ${inreply(post)}
        </div>
        <div class="content">${post.full_text.replaceAll("\n", "<br />")}</div>
        <div class="media">
        ${embedMedia(post.media)}
        </div>
        
        <ul class="permalinks">
          <li><a href="/note/tw/${post.id}">Permalink</a></li>
          <li><a href="https://twitter.com/philhawksworth/status/${post.id}">Twitter</a></li>
        </ul>
      </div>
    </div>
    </div>

  </body
</html>`;
