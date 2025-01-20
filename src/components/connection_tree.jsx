// //////////////////////////////////////////////////////////////Тестовый для роутеров 12.1(Рабочи-но без цветов )/////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import Draggable from "react-draggable";

// export default function ConnectionTree() {
//   const [pcs, setPcs] = useState([]);
//   const [routers, setRouters] = useState([]);

//   const fetchNodes = async () => {
//     try {
//       // Мокированные данные для роутеров
//       const routerData = [
//         { id: 1, name: "Router-1",  color: "#00FF00"},
//         { id: 2, name: "Router-2",  color: "#ff2500"},
//         { id: 3, name: "Router-3",  color: "#0000FF"},
//       ];

//       // Мокированные данные для ПК
//       const pcData = [
//         { id: 1, hostname: "PC-1", routerId: 1},
//         { id: 2, hostname: "PC-2", routerId: 2},
//         { id: 3, hostname: "PC-3", routerId: 3},
//       ];

//       const updatePcData = pcData.map((pc) => {
//         const router = routerData.find((r) => r.id === pc.routerId);
//         return { ...pc, color: router ? router.color: "#FFFFFF"}; 
//       });

//       // Устанавливаем данные в состояние
//       setPcs(updatePcData);
//       setRouters(routerData);
//     } catch (error) {
//       console.error("Ошибка при получении данных:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNodes();
//     const interval = setInterval(fetchNodes, 30000); // Обновляем каждые 30 секунд

//     return () => clearInterval(interval); // Очищаем интервал при размонтировании
//   }, []);

//   return (
//     <div className="canvas">
//       {/* Отображение роутеров */}
//       {routers.map((router) => (
//         <Draggable key={router.id}>
//           <div
//             className="Node-border router-node-border"
//             id={`router-${router.id}`}
//             style={{
//               padding: "1px",
//               borderRadius: "25px",
//               textAlign: "center",
//             }}
//           >
//             <div className="Node router-node">{router.name}</div>
//           </div>
//         </Draggable>
//       ))}

//       {/* Отображение ПК */}
//       {pcs.map((pc) => (
//         <Draggable key={pc.id}>
//           <div 
//           className="Node-border pc-node" 
//           id={`pc-${pc.id}`}
//           style={{
//             padding: "1px",
//             borderRadius: "25px",
//             textAlign: "center",
//           }}>
//             <div className="Node">{pc.hostname}</div>
//           </div>
//         </Draggable>
//       ))}
//     </div>
//   );
// }


//////////////////////////////////////////////////////////////Тестовый для роутеров 12.1(Main)///////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import Draggable from "react-draggable";

// export default function ConnectionTree() {
//   const [pcs, setPcs] = useState([]);
//   const [routers, setRouters] = useState([]);
//   const screenCenter = {
//     x: window.innerWidth / 2, // Центр экрана по горизонтали
//     y: window.innerHeight / 2, // Центр экрана по вертикали
//   };

//   const fetchNodes = async () => {
//     try {
//       // Мокированные данные для роутеров с цветами
//       const routerData = [
//         { id: 1, name: "Router1", color: "#00FF00" }, // Зеленый
//         { id: 2, name: "Router2", color: "#ff2500" }, // Красный
//         { id: 3, name: "Router3", color: "#0000FF" }, // Синий
//       ];

//       // Мокированные данные для ПК с привязкой к роутеру
//       const pcData = [
//         { id: 1, hostname: "PC1", routerId: 1, color: "#00FF00" }, // Зеленый
//         { id: 2, hostname: "PC2", routerId: 2, color: "#ff2500" }, // Красный
//         { id: 3, hostname: "PC3", routerId: 3, color: "#0000FF" }, // Синий
//       ];

//       setPcs(pcData);
//       setRouters(routerData);
//     } catch (error) {
//       console.error("Ошибка при получении данных:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNodes();
//   }, []);

//   return (
//     <div className="canvas"
//     style={{ position: "absolute",top: 0,right: 0, width: "200vh", height: "100vh", backgroundColor: "#1e1e1e",  overflow: "hidden", }}>
//       {/* Отображение роутеров */}
//       {routers.map((router, index) => (
//         <Draggable key={router.id}
//         key={router.id}
//         defaultPosition={{
//           x: screenCenter.x - 150 + index, // Позиционируем с отступами от центра
//           y: screenCenter.y - 150 ,
//         }}>
//           <div
//             style={{
//               backgroundColor: router.color,
//               border: `2px solid ${router.color}`,
//               borderRadius: "75%",
//               position: "relative",
//               padding: "25px",
//               margin: "50px",
//               width: "25px",
//               height: "25px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#FFF",
//               fontSize: "14px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               boxShadow: `0 0 8px ${router.color}`,
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: "-10px",
//                 left: "-10px",
//                 right: "-10px",
//                 bottom: "-10px",
//                 backgroundColor: `${router.color}23`,
//                 border: `2px dotted ${router.color}`,
//                 borderRadius: "25px",
//               }}
//             ></div>
//             {router.name}
//           </div>
//         </Draggable>
//       ))}

//       {/* Отображение ПК */}
//       {pcs.map((pc,index) => (
//         <Draggable key={pc.id}
//         defaultPosition={{
//           x: screenCenter.x + 50 + index, // Позиционируем с отступами от центра
//           y: screenCenter.y / 500 - 60 ,
//         }}>
//           <div
//             style={{
//               backgroundColor: pc.color,
//               border: `2px solid ${pc.color}`,
//               borderRadius: "75%",
//               position: "relative",
//               padding: "25px",
//               margin: "50px",
//               width: "25px",
//               height: "25px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#FFF",
//               fontSize: "14px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               boxShadow: `0 0 8px ${pc.color}`,
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: "-10px",
//                 left: "-10px",
//                 right: "-10px",
//                 bottom: "-10px",
//                 backgroundColor: `${pc.color}23`,
//                 border: `2px dotted ${pc.color}`,
//                 borderRadius: "25px",
//               }}
//             ></div>
//             {pc.hostname}
//           </div>
//         </Draggable>
//       ))}
//     </div>
//   );
// }


// //////////////////////////////////////////////////////////////Тестовый для роутеров 12.1(Test для линией)/////////////////////////////////////////////////////////////////
// import React, { useEffect, useState, useRef } from "react";
// import Draggable from "react-draggable";
// import LeaderLine from 'leader-line-new';

// export default function ConnectionTree() {
//   const [pcs, setPcs] = useState([]);
//   const [routers, setRouters] = useState([]);
//   const screenCenter = {
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2,
//   };
//   const linesRef = useRef([]);

//   const fetchNodes = async () => {
//     try {
//       // Мокированные данные для роутеров с цветами
//       const routerData = [
//         { id: 1, name: "Router1", color: "#00FF00" },
//         { id: 2, name: "Router2", color: "#ff2500" },
//         { id: 3, name: "Router3", color: "#0000FF" },
//       ];

//       // Мокированные данные для ПК с привязкой к роутеру
//       const pcData = [
//         { id: 1, hostname: "PC1", routerId: 1, color: "#00FF00" },
//         { id: 2, hostname: "PC1", routerId: 2, color: "#ff2500" },
//         { id: 3, hostname: "PC2", routerId: 2, color: "#ff2500" },
//         { id: 4, hostname: "PC1", routerId: 3, color: "#0000FF" },
//         { id: 5, hostname: "PC2", routerId: 3, color: "#0000FF" },
//         { id: 6, hostname: "PC3", routerId: 3, color: "#0000FF" },
//       ];

//       setPcs(pcData);
//       setRouters(routerData);
//     } catch (error) {
//       console.error("Ошибка при получении данных:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNodes();
//   }, []);

//   useEffect(() => {
//     // Создаем линии после того, как компоненты отрендерились
//     const timeout = setTimeout(() => {
//       linesRef.current = pcs.map(pc => {
//         const router = routers.find(r => r.id === pc.routerId);
//         if (router) {
//           const routerElement = document.getElementById(`router-${router.id}`);
//           const pcElement = document.getElementById(`pc-${pc.id}`);
//           if (routerElement && pcElement) {
//             return new LeaderLine(
//               routerElement,
//               pcElement,
//               {
//                 color: router.color,
//                 size: 4,
//                 endPlug: 'behind',
//                 startSocket: 'bottom',
//                 endSocket: 'top'
//               }
//             );
//           }
//         }
//         return null;
//       }).filter(line => line !== null);

//       // Функция для обновления линий при перетаскивании
//       const updateLines = () => {
//         linesRef.current.forEach(line => line.position());
//       };

//       // Добавляем слушатель события для обновления позиций линий
//       window.addEventListener('resize', updateLines);
      
//       // Удаляем линии и слушатель при размонтировании компонента
//       return () => {
//         linesRef.current.forEach(line => line.remove());
//         window.removeEventListener('resize', updateLines);
//       };
//     }, 100); // Задержка для уверенности, что элементы DOM доступны

//     return () => clearTimeout(timeout);
//   }, [pcs, routers]);

//   return (
//     <div className="canvas"
//       style={{ position: "absolute", top: 0, right: 0, width: "200vh", height: "100vh", backgroundColor: "#1e1e1e", overflow: "hidden" }}>
//       {/* Отображение роутеров */}
//       {routers.map((router, index) => (
//         <Draggable key={router.id}
//           defaultPosition={{
//             x: screenCenter.x - 150 , // Отступы для размещения
//             y: screenCenter.y / 50,
//           }}
//           onDrag={() => {
//             // Обновляем позиции линий при перетаскивании
//             linesRef.current.forEach(line => line.position());
//           }}
//         >
//           <div
//             id={`router-${router.id}`}
//             style={{
//               backgroundColor: router.color,
//               border: `2px solid ${router.color}`,
//               borderRadius: "75%",
//               position: "relative",
//               padding: "25px",
//               margin: "50px",
//               width: "25px",
//               height: "25px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#FFF",
//               fontSize: "14px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               boxShadow: `0 0 8px ${router.color}`,
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: "-10px",
//                 left: "-10px",
//                 right: "-10px",
//                 bottom: "-10px",
//                 backgroundColor: `${router.color}23`,
//                 border: `2px dotted ${router.color}`,
//                 borderRadius: "25px",
//               }}
//             ></div>
//             {router.name}
//           </div>
//         </Draggable>
//       ))}

//       {/* Отображение ПК */}
//       {pcs.map((pc, index) => (
//         <Draggable key={pc.id}
//           defaultPosition={{
//             x: screenCenter.x + 50 , // Отступы для размещения
//             y: screenCenter.y /500 - 200,
//           }}
//           onDrag={() => {
//             // Обновляем позиции линий при перетаскивании
//             linesRef.current.forEach(line => line.position());
//           }}
//         >
//           <div
//             id={`pc-${pc.id}`}
//             style={{
//               backgroundColor: pc.color,
//               border: `2px solid ${pc.color}`,
//               borderRadius: "75%",
//               position: "relative",
//               padding: "25px",
//               margin: "50px",
//               width: "25px",
//               height: "25px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#FFF",
//               fontSize: "14px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               boxShadow: `0 0 8px ${pc.color}`,
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: "-10px",
//                 left: "-10px",
//                 right: "-10px",
//                 bottom: "-10px",
//                 backgroundColor: `${pc.color}23`,
//                 border: `2px dotted ${pc.color}`,
//                 borderRadius: "25px",
//               }}
//             ></div>
//             {pc.hostname}
//           </div>
//         </Draggable>
//       ))}
//     </div>
//   );
// }
////////////////////////////Test
import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import LeaderLine from "leader-line-new";

export default function ConnectionTree({ selectedRouters }) {
  const linesRef = useRef([]);

  useEffect(() => {
    // Удаляем старые линии
    linesRef.current.forEach((line) => line.remove());
    linesRef.current = [];

    // Создаем новые линии
    selectedRouters.forEach((router) => {
      router.pcs.forEach((pc) => {
        const routerElement = document.getElementById(`router-${router.id}`);
        const pcElement = document.getElementById(`pc-${pc.id}`);
        if (routerElement && pcElement) {
          const line = new LeaderLine(routerElement, pcElement, {
            color: router.color,
            size: 4,
            endPlug: "behind",
          });
          linesRef.current.push(line);
        }
      });
    });

    return () => {
      // Удаляем линии при размонтировании
      linesRef.current.forEach((line) => line.remove());
    };
  }, [selectedRouters]);

  return (
    <div
      className="canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#141414",
      }}
    >
      {/* Отображение роутеров */}
      {selectedRouters.map((router) => (
        <Draggable
          key={router.id}
          defaultPosition={{
            x: Math.random() * 200 + 100,
            y: Math.random() * 200 + 100,
          }}
        >
          <div
            id={`router-${router.id}`}
            className="router-node-border"
            style={{ borderColor: router.color }}
          >
            <div
              className="router-node"
              style={{ backgroundColor: router.color }}
            >
              {router.name}
            </div>
          </div>
        </Draggable>
      ))}

      {/* Отображение ПК */}
      {selectedRouters.flatMap((router) =>
        router.pcs.map((pc) => (
          <Draggable
            key={pc.id}
            defaultPosition={{
              x: Math.random() * 300 + 400,
              y: Math.random() * 200 + 200,
            }}
          >
            <div
              id={`pc-${pc.id}`}
              className="Node-border"
              style={{ borderColor: pc.color }}
            >
              <div
                className="Node"
                style={{ backgroundColor: pc.color }}
              >
                {pc.name}
              </div>
            </div>
          </Draggable>
        ))
      )}
    </div>
  );
}