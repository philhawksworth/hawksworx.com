

export default function headingAnchors(page: object, elements: string) {
  for (const heading of page.document.querySelectorAll(elements)) {
    const link = page.document.createElement("a");
    const frag = heading.innerText.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').replaceAll(" ", "-")
    link.innerHTML = '<span aria-hidden="true" data-pagefind-ignore=""><img src="/images/icons/link.svg" class="anchor"></span>'
    link.className = "direct-link";
    link.setAttribute("href", "#"+frag);
    link.setAttribute("name", frag);
    heading.prepend(link);  
  }
}

