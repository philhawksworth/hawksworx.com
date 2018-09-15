module.exports = ({ text, date, href }) => (`
  <div class="tout blog-tout">
    <h2>
      ${ href
        ? `<a href="/posts/${href}">${text}</a>`
        : `${text}`
      }
    </h2>
    <span class="date">${date}</span>
  </div>
`);
