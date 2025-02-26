import React from "react";

const IconPC = (props) => {
  return React.createElement(
    "svg",
    {
      className: "icon",
      viewBox: "0 0 64 64",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      width: props.width || "24",
      height: props.height || "24",
      style: props.style,
    },
    React.createElement("rect", { x: "12", y: "20", width: "40", height: "24", rx: "3", fill: "white", stroke: "black", strokeWidth: "2" }),
    React.createElement("circle", { cx: "32", cy: "32", r: "2", fill: "blue" }),
    React.createElement("rect", { x: "20", y: "46", width: "24", height: "4", fill: "black" })
  );
};

export default IconPC;