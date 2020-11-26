import React, { useState } from "react";
import styles from "./Image.module.css";
import Rendition from "./Rendition";
import { useInView } from "react-intersection-observer";

const media_url = process.env.NEXT_PUBLIC_MEDIA_URL;

/*

 renditions={item.swp_article_feature_media.renditions}
  srcSet={[
    { name: "400x240", maxWidth: "600" },
    { name: "600x360", minWidth: "601", maxWidth: "960" },
    { name: "960x480", minWidth: "961" },
  ]}
  - srcSet: name of rendition, minWidth and maxWidth are used to build media query ex (min-width: 600px)

  fallbackRendition="400x240" - if <source> is not supported
  thumbnailRendition="300x220" - thumbnail used for blurred image. Smaller the better.
  Few pixels like 20x30 is enough. It has to be same aspect ration as all other renditions.

  caption="this is a caption" - will be shown if present
  width={960} - used only to calculate aspect ratio
  height={480} - used only to calculate aspect ratio

*/

const Image = ({
  renditions = [],
  srcSet = [],
  className = "",
  caption = "",
  fallbackRendition = "original",
  thumbnailRendition = "",
  width = 0,
  height = 0,
}) => {
  if (!width || !height) return null;
  const randomId = Math.random().toString(36).substring(7);
  const [loaded, setLoaded] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const onLoad = () => {
    setLoaded(true);
  };

  let thumbnail = null;

  if (thumbnailRendition) {
    let tRendition = renditions.find(
      (rendition) => rendition.name === thumbnailRendition
    );

    if (tRendition) thumbnail = tRendition;
  }

  let fallbackImage = renditions.find(
    (rendition) => rendition.name === fallbackRendition
  );

  if (!fallbackImage) {
    fallbackImage = renditions.find(
      (rendition) => rendition.name === "original"
    );
  }
  const fallbackJpeg = `${media_url}${fallbackImage.image.asset_id}.${fallbackImage.image.file_extension}`;

  const aspectRatio = (height / width) * 100;

  const image = (
    <picture style={{ opacity: loaded ? 1 : 0 }}>
      {srcSet.map((option, index) => (
        <Rendition
          key={randomId + "-" + index}
          renditions={renditions}
          minWidth={option.minWidth}
          maxWidth={option.maxWidth}
          name={option.name}
        />
      ))}
      <img
        src={fallbackJpeg}
        alt={caption}
        title={caption}
        onLoad={onLoad}
        className={styles.imageFull}
        style={{ opacity: loaded ? 1 : 0 }}
      ></img>
    </picture>
  );

  return (
    <figure className={className}>
      <div
        ref={ref}
        className={styles.adaptiveImage}
        style={{
          paddingBottom: `${aspectRatio}%`,
        }}
      >
        {thumbnail ? (
          <img
            className={styles.imageThumb}
            src={`${media_url}${thumbnail.image.asset_id}.${thumbnail.image.file_extension}`}
            style={{ visibility: loaded ? "hidden" : "visible" }}
          />
        ) : null}
        {inView ? image : null}
      </div>

      {caption.length ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
};

export default Image;
