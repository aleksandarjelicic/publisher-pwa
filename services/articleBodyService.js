const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const media_url = process.env.NEXT_PUBLIC_MEDIA_URL;

export const convertBodyImages = (body) => {
  let dom = new JSDOM(body);
  let { document } = dom.window;
  let images = document.querySelectorAll("img");


  images.forEach(node => {
    // node.getAttribute("data-image-id");
    const src = node.getAttribute("src");
    const regex = /[^\/\.]*\.\w{3,4}/gm;
    let fileNameMatches = src.match(regex);
    let fileName = fileNameMatches[0];

    node.setAttribute("src", media_url + '/' + fileName);
  })

  let serialized = document.documentElement.querySelector("body").innerHTML;

  return serialized;
}