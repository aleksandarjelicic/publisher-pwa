const media_url = process.env.NEXT_PUBLIC_MEDIA_URL;

const AmpImage = ({
  renditions,
  renditionName,
  caption = "",
  width,
  height,
  className = "",
}) => {
  let rendition = renditions.find((rend) => rend.name === renditionName);
  if (!rendition)
    rendition = renditions.find((rend) => rend.name === "original");

  if (rendition.swp_image) rendition.image = rendition.swp_image;

  let src = "";
  if (rendition.variants && rendition.variants.includes("webp")) {
    src = `${media_url}${rendition.image.asset_id}.webp`;
  } else {
    src = `${media_url}${rendition.image.asset_id}.${rendition.image.file_extension}`;
  }

  return (
    <amp-img
      src={src}
      height={height}
      width={width}
      layout="responsive"
      alt={caption}
      className={className}
    ></amp-img>
  );
};

export default AmpImage;
