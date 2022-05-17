"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _useScrollPercentage = _interopRequireDefault(require("./useScrollPercentage"));

const _excluded = ["columns", "rows", "rowHeight", "lines"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const ERTable = _ref => {
  let {
    columns,
    rows,
    rowHeight,
    lines
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [scrollRef, scrollPercentage] = (0, _useScrollPercentage.default)();
  const memoizedRows = (0, _react.useMemo)(() => {
    return rows.map((row, index) => /*#__PURE__*/_react.default.createElement("tr", {
      key: "endless-row-".concat(index),
      style: {
        maxHeight: rowHeight,
        background: "#" + ((1 << 24) * Math.random() | 0).toString(16)
      }
    }, /*#__PURE__*/_react.default.createElement("td", {
      style: {
        maxHeight: "".concat(rowHeight, "px")
      }
    }, row.name)));
  }, [rows, rowHeight]);
  const renderedRows = (0, _react.useMemo)(() => {
    const perc = scrollPercentage / 100;
    let max = Math.ceil(rows.length * perc);
    if (max < lines) max = lines;
    const tenPercent = Math.ceil(lines / 10);

    if (max + tenPercent > rows.length) {
      max = rows.length;
    } else {
      max += tenPercent;
    }

    let min = max - lines;

    if (min - tenPercent < 0) {
      min = 0;
    } else {
      min -= tenPercent;
    }

    return memoizedRows.slice(min, max);
  }, [lines, memoizedRows, scrollPercentage]);
  const aboveLength = scrollPercentage * rowHeight * (rows.length - lines) / 100;
  const belowLength = rowHeight * (rows.length - lines) - aboveLength;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      maxHeight: "".concat(rowHeight * lines, "px"),
      overflow: 'auto'
    },
    ref: scrollRef
  }, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("tr", {
    style: {
      height: "".concat(aboveLength, "px"),
      visibility: 'hidden'
    }
  }, /*#__PURE__*/_react.default.createElement("td", null, "Hidden")), renderedRows, /*#__PURE__*/_react.default.createElement("tr", {
    style: {
      height: "".concat(belowLength, "px"),
      visibility: 'hidden'
    }
  }, /*#__PURE__*/_react.default.createElement("td", null, "Hidden"))));
};

var _default = ERTable;
exports.default = _default;