"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useScrollPercentage;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function useScrollPercentage() {
  const scrollRef = (0, _react.useRef)(null);
  const [scrollPercentage, setScrollPercentage] = (0, _react.useState)(NaN);

  const reportScroll = e => {
    setScrollPercentage(getScrollPercentage(e.target));
  };

  (0, _react.useEffect)(() => {
    const node = scrollRef.current;

    if (node !== null) {
      node.addEventListener("scroll", reportScroll, {
        passive: true
      });

      if (Number.isNaN(scrollPercentage)) {
        setScrollPercentage(getScrollPercentage(node));
      }
    }

    return () => {
      if (node !== null) {
        node.removeEventListener("scroll", reportScroll);
      }
    };
  }, [scrollPercentage]);
  return [scrollRef, Number.isNaN(scrollPercentage) ? 0 : scrollPercentage];
}

function getScrollPercentage(element) {
  if (element === null) {
    return NaN;
  }

  const height = element.scrollHeight - element.clientHeight;
  return element.scrollTop / height * 100;
}