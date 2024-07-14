export const layout = "layouts/tag.vto";

export default function* ({search}) {
  const tags =  search.values("tags").filter((tag) => tag !== "post");
  for (const tag of tags) {
    yield {
      url: `/blog/tags/${tag}/`,
      tag: tag,
      layout: layout,
      body: tag
    };
  }
}