const fs = require('fs');
const data = require('./outbox.json');


var posts = [];


data.orderedItems.forEach(item => {
  
  const post = item;

  if (post.object.type == "Note") {
    
    // if this was a reply get the screen name 
    const re = /\/users\/(.+)\/statuses\//gm;
    const reply = post?.object?.inReplyToAtomUri;
    let screenName = null;
    if(reply) {
      for(const match of reply.matchAll(re)) { 
        screenName = match[1];
      };

    }

    // gather any media
    let media = [];
    if(post.object.attachment.length) {

      post.object.attachment.forEach(attachment => {
        media.push({
          type: attachment.mediaType,
          url: `https://cdn.masto.host${attachment.url}`
        })
      });

    }
  
    

    posts.push({
      "id": post.object.url.split("@philhawksworth/")[1],
      "platform": "mastodon",
      "created_at": new Date(post.published),
      "full_text": post.object.content,
      "in_reply_to_status_id": post.object.inReplyToAtomUri || null,
      "in_reply_to_screen_name": screenName || null,
      "media" : media
    });


  }

})
  



fs.writeFile('src/site/_data/toots.json', JSON.stringify(posts.reverse()), err => {
  if (err) {
    console.error(err);
  }
  console.error("Notes saved");
});
