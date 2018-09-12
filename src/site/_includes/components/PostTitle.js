module.exports = ({ text, href }) => (`
  <h3>
    ${ href
      ? `<a href="/posts/${href}">${text}</a>`
      : `${text}`
    }
  </h3>
`);
