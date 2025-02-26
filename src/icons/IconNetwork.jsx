// import React from "react";

// const IconNetwork = () => {
//   return React.createElement(
//     "svg",
//     { className: "icon", viewBox: "0 0 64 64", fill: "none", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24" },
//     React.createElement("rect", { x: "14", y: "32", width: "36", height: "16", rx: "3", fill: "white", stroke: "black", strokeWidth: "2" }),
//     React.createElement("circle", { cx: "24", cy: "40", r: "2", fill: "orange" }),
//     React.createElement("circle", { cx: "32", cy: "40", r: "2", fill: "white" }),
//     React.createElement("circle", { cx: "40", cy: "40", r: "2", fill: "red" }),
//     React.createElement("line", { x1: "24", y1: "32", x2: "24", y2: "24", stroke: "white", strokeWidth: "2" }),
//     React.createElement("line", { x1: "40", y1: "32", x2: "40", y2: "24", stroke: "white", strokeWidth: "2" })
//   );
// };

// export default IconNetwork;
import React from "react";

const IconNetwork = (props) => {
  return React.createElement(
    "svg",
    {
      viewBox: "0 0 64 64",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      width: props.width || "24",
      height: props.height || "24",
      style: props.style,
    },
    React.createElement("rect", { x: "14", y: "32", width: "36", height: "16", rx: "3", fill: "white", stroke: "black", strokeWidth: "2" }),
    React.createElement("circle", { cx: "24", cy: "40", r: "2", fill: "orange" }),
    React.createElement("circle", { cx: "32", cy: "40", r: "2", fill: "white" }),
    React.createElement("circle", { cx: "40", cy: "40", r: "2", fill: "red" }),
    React.createElement("line", { x1: "24", y1: "32", x2: "24", y2: "24", stroke: "white", strokeWidth: "2" }),
    React.createElement("line", { x1: "40", y1: "32", x2: "40", y2: "24", stroke: "white", strokeWidth: "2" })
  );
};

export default IconNetwork;


