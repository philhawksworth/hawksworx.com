export const layout = "layouts/notes-list.vto";

export default function* ({ notes, paginate }) {
    
  const options = {
    url: (n) => `/notes/${n}/`,
    size: 100,
  };

  for (const page of paginate(notes, options)) {
    yield page;
  }
}