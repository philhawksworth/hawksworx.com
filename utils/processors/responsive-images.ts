

export default function images(page: object) {
  for (const image of page.document.querySelectorAll("img")) {

    if (image.hasAttribute("responsive")) {
      
      // Get the path and file
      const src = image.getAttribute("src");
      const file = src.split("images/")[1];
      
      // Define our sizes and breakpoints
      const sizes = `"(max-width: 450px) 200px,
      (max-width: 850px) 400px,
      (max-width: 100px) 800px,
      1200px"`;
      const set = `/images/200/${file} 200w,
      /images/400/${file} 400w,
      /images/800/${file} 800w,
      /images/1200/${file} 1200w`;
      
      // attribute order matters populate them accordingly
      image.removeAttribute("src");
      image.setAttribute("sizes", sizes);
      image.setAttribute("srcset", set);
      image.setAttribute("src", src);
      image.removeAttribute("responsive");
    }

  }
}

