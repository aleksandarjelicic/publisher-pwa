import React, { useState, useRef, useEffect } from "react";
import Glide from "@glidejs/glide";
import { findRenditionSize, prepareItems } from "./helpers";

const Slideshow = ({
  items = [],
  srcSet = [],
  width = 0,
  height = 0,
  options = {},
  slideshowId = "glide",
}) => {
  const track = useRef();
  const [slider, setSlider] = useState(new Glide(`.${slideshowId}`, options));
  const [galleryItems, setGalleryItems] = useState([]);
  const aspectRatio = height / width;

  useEffect(() => {
    const renditionName = findRenditionSize(srcSet);
    setGalleryItems(prepareItems(items, renditionName));
    // slider cleanup
    return () => {
      try {
        slider.destroy();
        setSlider(null);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  useEffect(() => {
    slider.mount();
  }, [galleryItems]);

  return (
    <div className={`glide ${slideshowId}`}>
      <div className="glide__track" data-glide-el="track" ref={track}>
        <ul className="glide__slides">
          {galleryItems.map((image, index) => {
            let elWidth = track.current.parentElement.clientWidth;
            let elHeight = aspectRatio * elWidth;
            let styles = {
              backgroundImage: `url(${image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 60%",
              paddingBottom: `${aspectRatio}%`,
              width: `${elWidth}px`,
              height: `${elHeight}px`,
            };
            return (
              <li
                className="glide__slide"
                key={`${slideshowId}-slide${index}`}
                style={styles}
              ></li>
            );
          })}
        </ul>
      </div>
      <div className="glide__bullets" data-glide-el="controls[nav]">
        {galleryItems.map((i, index) => (
          <button
            className="glide__bullet"
            key={`${slideshowId}-slideBullet${index}`}
            data-glide-dir={"=" + index}
          ></button>
        ))}
      </div>
      <div className="glide__arrows" data-glide-el="controls">
        <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
          prev
        </button>
        <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
          next
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
