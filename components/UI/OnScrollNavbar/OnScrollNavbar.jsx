import React, { useState, useEffect } from "react";
import classNames from "classnames";
import _ from "lodash";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevOffset, setPrevOffset] = useState(0);

  const toggleScrollDirection = () => {
    let scrollY = window.scrollY;

    if (scrollY === 0) {
      setScrollDirection(null);
    }
    console.log(scrollY, prevOffset);
    if (scrollY > prevOffset) {
      setScrollDirection("down");
    } else if (scrollY < prevOffset) {
      setScrollDirection("up");
    }
    setPrevOffset(scrollY);
  };

  const throttledToggleScrollDirection = _.throttle(toggleScrollDirection, 200);

  useEffect(() => {
    window.addEventListener("scroll", throttledToggleScrollDirection);
    return () => {
      window.removeEventListener("scroll", throttledToggleScrollDirection);
    };
  });

  return [scrollDirection, prevOffset];
};

const OnScrollNavbar = ({ children, offsetFromTop = 0 }) => {
  const [scrollDirection, offset] = useScrollDirection();
  let visible = false;

  if (scrollDirection === "up" && offset > offsetFromTop) {
    visible = true;
  }

  //console.log(scrollDirection, offset, visible);

  return (
    <div
      className={classNames("onScrollNavbar", {
        "onScrollNavbar--visible": visible,
      })}
    >
      {children}
    </div>
  );
};

export default OnScrollNavbar;
