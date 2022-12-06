/*
  construct user and status URLs for twitter or mastodon
*/
export default function(platform, user, status) {

  const platformRoot = {
    "twitter": "https://twitter.com/",
    "mastodon": "https://indieweb.social/@"
  };
  const platformStatusPath = {
    "twitter": "/status/",
    "mastodon": "/"
  }


  const userLink = `${platformRoot[platform]}${user}`;

  if (status) {
    return `${userLink}${platformStatusPath[platform]}${status}`
  }
  else {
    return userLink;
  }

}
