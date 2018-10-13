module.exports = ({ title, date, href, tags' }) => (`
  <div class="tout blog-tout">
    <p class="by-line">${date}</p>
    <h3><a href="${href}">${title}</a></h3>
    <ul class="tag-list">
      <li>${tags}</li>
    </ul>
  </div>
`);
