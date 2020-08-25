const media_url = process.env.NEXT_PUBLIC_MEDIA_URL;

const Rendition = ({ renditions, name, maxWidth, minWidth }) => {
  let rendition = renditions.find((rend) => rend.name === name);
  if (!rendition) return null;

  let media = "";

  if (minWidth) {
    media += `(min-width: ${minWidth}px)`;
  }

  if (minWidth && maxWidth) {
    media += " and ";
  }

  if (maxWidth) {
    media += `(max-width: ${maxWidth}px)`;
  }

  return (
    <>
      {rendition.variants && rendition.variants.includes("webp") ? (
        <source
          media={media}
          data-srcset={`${media_url}${rendition.image.asset_id}.webp`}
          type="image/webp"
          srcSet={`${media_url}${rendition.image.asset_id}.webp`}
        />
      ) : null}

      <source
        media={media}
        data-srcset={`${media_url}${rendition.image.asset_id}.${rendition.image.file_extension}`}
        type="image/jpeg"
        srcSet={`${media_url}${rendition.image.asset_id}.${rendition.image.file_extension}`}
      />
    </>
  );
};

export default Rendition;
