import * as React from "react";
import { fixed, getScrollPage, outerHeight } from "./utils";

// for update width
const upSize = (cb) => window.requestAnimationFrame(cb);

const ReadingProgress = ({ height, barColor, refTarget }) => {
  // update bar width
  const [scrolled, setScrolled] = React.useState("0%");
  // listen scroll
  React.useEffect(() => {
    // update on mount
    updatePos();
    window.addEventListener("scroll", updatePos);
    return () => window.removeEventListener("scroll", updatePos);
  }, []);

  // update width with scroll position
  const updatePos = () => {
    // if ref use it or use container by ID
    const targetContainer = refTarget ? refTarget.current : null;

    let elementHeight = 0;
    let startTop = 0;
    // scroll
    const scrollPx = getScrollPage();
    // if targeted element
    if (targetContainer) {
      // element height
      elementHeight =
        outerHeight(targetContainer) - document.documentElement.clientHeight;
      startTop = targetContainer.offsetTop;
    } else {
      // window height
      elementHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    }
    // remove difference between top window and element
    const _t = fixed(scrollPx - startTop);

    // if before element position when target is element
    if (scrollPx < startTop) {
      return upSize(() => setScrolled("0%"));
    }
    // if after element end
    if (_t > elementHeight) {
      return upSize(() => setScrolled("100%"));
    }
    // position scroll
    const _p = fixed(_t / elementHeight);
    // percentage for css
    const pos = `${fixed(_p * 100)}%`;
    // update scroll
    upSize(() => setScrolled(pos));
  };
  // style for container
  const containerStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    height,
    zIndex: "999",
  };
  // style for bar
  const barStyle = {
    height,
    background: barColor,
    width: scrolled,
  };
  return (
    <div style={containerStyle}>
      <div style={barStyle} />
    </div>
  );
};

export default React.memo(ReadingProgress);
