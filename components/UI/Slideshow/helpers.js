const media_url = process.env.NEXT_PUBLIC_MEDIA_URL;

export const findRenditionSize = (srcSet) => {
  const windowWidth = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  let rendition = "original";

  for (let option of srcSet) {
    if (!option.minWidth) option.minWidth = 0;
    if (!option.maxWidth) option.maxWidth = 999999999999999999999999;

    if (option.minWidth <= windowWidth && option.maxWidth >= windowWidth) {
      rendition = option.name;
    }
  }

  return rendition;
};

export const prepareItems = (items, renditionName) => {
  let galleryItems = [];
  items.sort((a, b) => (a.position > b.position) ? 1 : -1);

  items.forEach(item => {
    let rendition = item.swp_article_media.swp_image_renditions.find(rend => rend.name === renditionName);
    if (!rendition) {
      rendition = item.swp_article_media.swp_image_renditions.find(rend => rend.name === "original");
    }

    let url = `${media_url}${rendition.swp_image.asset_id}.${rendition.swp_image.file_extension}`;
    if (rendition.swp_image.variants.includes("webp")) {
      url = `${media_url}${rendition.swp_image.asset_id}.webp`
    }

    galleryItems.push(url)
  })

  return galleryItems;
};