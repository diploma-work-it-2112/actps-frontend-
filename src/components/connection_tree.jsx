import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import LeaderLine from "leader-line-new";

export default function ConnectionTree({ routers, pcs }) {
  const screenCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  const linesRef = useRef([]);

  useEffect(() => {
    console.log("Routers in ConnectionTree:", routers);
    console.log("PCs in ConnectionTree:", pcs);

    // новые линии
    const newLines = pcs
      .map((pc) => {
        const router = routers.find((r) => r.id === pc.routerId);
        if (router) {
          const routerElement = document.getElementById(`router-${router.id}`);
          const pcElement = document.getElementById(`pc-${pc.id}`);
          if (routerElement && pcElement) {
            return new LeaderLine(routerElement, pcElement, {
              color: router.color,
              size: 4,
              endPlug: "behind",
              startSocket: "bottom",
              endSocket: "top",
            });
          }
        }
        return null;
      })
      .filter((line) => line !== null);

    linesRef.current = newLines;

    const updateLines = () => {
      linesRef.current.forEach((line) => line.position());
    };

    window.addEventListener("resize", updateLines);

    return () => {
      linesRef.current.forEach((line) => line.remove());
      window.removeEventListener("resize", updateLines);
    };
  }, [pcs, routers]);

  return (
    <div
      className="canvas"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "200vh",
        height: "100vh",
        backgroundColor: "#1e1e1e",
        overflow: "hidden",
      }}
    >
      {routers.map(
        (router) =>
          router && (
            <Draggable
              key={router.id}
              defaultPosition={{
                x: screenCenter.x - 150,
                y: screenCenter.y / 50,
              }}
              onDrag={() => {
                linesRef.current.forEach((line) => line.position());
              }}
            >
              <div
                id={`router-${router.id}`}
                style={{
                  // ...router.style, // Apply all styles from router.style
                  backgroundColor: router.color,
                  border: `2px solid ${router.color}`,
                  opacity: router.opacity || 1,
                  borderRadius: "75%",
                  position: "relative",
                  padding: "25px",
                  margin: "50px",
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFF",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: `0 0 8px ${router.color}`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    right: "-10px",
                    bottom: "-10px",
                    backgroundColor: `${router.color}23`,
                    border: `2px dotted ${router.color}`,
                    borderRadius: "25px",
                  }}
                ></div>
                {router.name}
              </div>
            </Draggable>
          )
      )}

      {pcs.map(
        (pc) =>
          pc && (
            <Draggable
              key={pc.id}
              defaultPosition={{
                x: screenCenter.x + 50,
                y: screenCenter.y / 500 - 200,
              }}
              onDrag={() => {
                linesRef.current.forEach((line) => line.position());
              }}
            >
              <div
                id={`pc-${pc.id}`}
                style={{
                  // ...pc.style, // Apply all styles from router.style
                  backgroundColor: pc.color,
                  border: `2px solid ${pc.color}`,
                  opacity: pc.opacity || 1,
                  borderRadius: "75%",
                  position: "relative",
                  padding: "25px",
                  margin: "50px",
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFF",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: `0 0 8px ${pc.color}`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    right: "-10px",
                    bottom: "-10px",
                    backgroundColor: `${pc.color}23`,
                    border: `2px dotted ${pc.color}`,
                    borderRadius: "25px",
                  }}
                ></div>
                {pc.name}
              </div>
            </Draggable>
          )
      )}
    </div>
  );
}
//////////////////////////////////////////////////////////////////////////////////
// export default function ConnectionTree({ routers, pcs }) {
//   const screenCenter = {
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2,
//   };

//   return (
//     <div className="canvas">
//       {routers.map((router) => (
//         <div
//           key={router.id}
//           id={`router-${router.id}`}
//           style={{
//             backgroundColor: router.color,
//             border: `2px solid ${router.color}`,
//             opacity: router.style?.opacity || 1, // Apply opacity
//           }}
//         >
//           {router.name}
//         </div>
//       ))}
//       {pcs.map((pc) => (
//         <div
//           key={pc.id}
//           id={`pc-${pc.id}`}
//           style={{
//             backgroundColor: pc.color,
//             border: `2px solid ${pc.color}`,
//             opacity: pc.style?.opacity || 1, // Apply opacity
//           }}
//         >
//           {pc.name}
//         </div>
//       ))}
//     </div>
//   );
// }
