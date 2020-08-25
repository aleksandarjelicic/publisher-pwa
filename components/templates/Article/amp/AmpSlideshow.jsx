import AmpImage from "./AmpImage";

const AmpSlideshow = ({ items, renditionName, width, height, slideshowId }) => {
  return (
    <amp-carousel
      width={width}
      height={height}
      layout="responsive"
      type="slides"
    >
      {items.map((item, index) => (
        <AmpImage
          key={slideshowId + "-" + index}
          renditions={item.swp_article_media.swp_image_renditions}
          caption={item.swp_article_media.description}
          renditionName={renditionName}
          width={width}
          height={height}
        />
      ))}
    </amp-carousel>
  );
};

export default AmpSlideshow;
