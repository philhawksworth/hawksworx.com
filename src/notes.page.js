export const layout = "layouts/notes-list.vto";

export default function* ({ notes, paginate }) {
    
  const options = {
    url: (n) => n == 1 ? `/notes/` : `/notes/${n}/`,
    size: 50,
  };

  for (const page of paginate(notes, options)) {
    yield page;
  }
}