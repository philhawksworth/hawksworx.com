export const layout = "layouts/base.vto";

const pageHTML = `tag page`;

export default function* () {
  const tags = search.values("tags").filter((tag) => tag !== "post");

  console.log(tags.length);

  for (const tag of tags) {
    yield {
      url: `/tag/${tag}/`,
      content: pageHTML
    };
  }
}




{/* <section>
  <hgroup>
    <h1>{{ tag }}</h1>
    <p>All <a href="/blog/">posts</a> tagged "{{ tag }}"</p>
  </hgroup>
</section>
<section>
  {{# <ol>
  {% assign taglist = collections[ tag ] %}
  {% for post in taglist | reverse %}
    <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
  {% endfor %}
  </ol>
  <hr>
  <p>
    View the <a href="/blog/tags/">complete tag list</a>.
  </p> #}}
</section> */}