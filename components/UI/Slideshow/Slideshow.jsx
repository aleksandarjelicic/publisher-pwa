import React, { useState, useRef, useEffect } from "react";
import { findRenditionSize, prepareItems } from "./helpers";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 100;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Slideshow = ({ items = [], srcSet = [], width = 0, height = 0 }) => {
  const aspectRatio = height / width;
  const track = useRef();
  const [[page, direction], setPage] = useState([0, 0]);
  const [[elWidth, elHeight], setSize] = useState([0, 0]);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const w = track.current.parentElement.clientWidth;
    const h = aspectRatio * w;
    setSize([w, h]);

    const renditionName = findRenditionSize(srcSet);
    setGalleryItems(prepareItems(items, renditionName));
  }, []);

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? elWidth : -elWidth,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? elWidth : -elWidth,
        opacity: 0,
      };
    },
  };

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const trackStyles = {
    width: `${elWidth}px`,
    height: `${elHeight}px`,
  };

  const imageStyles = {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 60%",
    width: `${elWidth}px`,
    height: `${elHeight}px`,
  };

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, galleryItems.length, page);

  return (
    <div className="slideshow" ref={track} style={trackStyles}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="image"
          style={{
            ...imageStyles,
            backgroundImage: `url(${galleryItems[imageIndex]})`,
          }}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 900, damping: 100 },
            opacity: { duration: 0.9 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        {"‣"}
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        {"‣"}
      </div>
    </div>
  );
};

export default Slideshow;
