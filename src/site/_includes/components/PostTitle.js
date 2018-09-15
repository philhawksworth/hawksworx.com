module.exports = ({ title, date, href, tags, theme='red' }) => (`
  <div class="tout blog-tout">
    <div class="container">
      <ul class="tag-list">
        <li>${tags}</li>
      </ul>
      <div class="card">
        <h3>${title}</h3>
      </div>
      <p class="date">${date}</p>
    </div>
  </div>
`);
