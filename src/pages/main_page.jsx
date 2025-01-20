// import ConnectionTree from "../components/connection_tree";
// import LeftNavBar from "../components/navbar";

// export default function MainPage(){
// 	const [selectedItems, setSelectedItems] = useState([]); // Храним выбранные элементы
// 	return(
// 		<>
// 			<LeftNavBar />
// 			<ConnectionTree />	
// 		</>
// 	)
// }
// ////////////////main////////
// import React, { useState, useEffect } from "react";
// import ConnectionTree from "../components/connection_tree";
// import LeftNavBar from "../components/navbar";

// export default function MainPage() {
//   const [allItems, setAllItems] = useState([]); // Все элементы из базы данных
//   const [selectedItems, setSelectedItems] = useState([]); // Отфильтрованные элементы для отображения

//   useEffect(() => {
//     // Загрузка данных (имитация бэкенда)
//     const fetchData = async () => {
//       const data = [
//         {
//           name: "Router1",
//           color: "#00FF00",
//           pcs: [
//             { name: "PC1", color: "#00FF00" },
//             { name: "PC2", color: "#00FF00" },
//           ],
//         },
//         {
//           name: "Router2",
//           color: "#FF0000",
//           pcs: [{ name: "PC3", color: "#FF0000" }],
//         },
//         {
//           name: "Router3",
//           color: "#0000FF",
//           pcs: [
//             { name: "PC4", color: "#0000FF" },
//             { name: "PC5", color: "#0000FF" },
//           ],
//         },
//       ];
//       setAllItems(data);
//       setSelectedItems(data); // Отображаем все изначально
//     };

//     fetchData();
//   }, []);

//   const handleScan = (selected) => {
//     // Проверяем, выбрано ли что-то, и фильтруем данные
//     if (selected.length > 0) {
//       const filteredItems = allItems.filter((router) =>
//         selected.some((sel) => sel.name === router.name)
//       ).map((router) => ({
//         ...router,
//         pcs: router.pcs.filter((pc) =>
//           selected.find((sel) => sel.name === router.name)?.pcs.some((sPc) => sPc.name === pc.name)
//         )
//       }));
//       setSelectedItems(filteredItems);
//     } else {
//       setSelectedItems(allItems); // Если ничего не выбрано, показываем всё
//     }
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       {/* Передаем общие данные и функцию для обработки выбора */}
//       <LeftNavBar allItems={allItems} onScan={handleScan} />
//       {/* Отображаем только выбранные элементы */}
//       <ConnectionTree selectedItems={selectedItems} />
//     </div>
//   );
// }
//////////////////Test////////
import React, { useEffect, useState } from "react";
import ConnectionTree from "../components/connection_tree";
import LeftNavBar from "../components/navbar";
import  Router from "../Entities/classRouter";
import  PC from "../Entities/classPC"; 

export default function MainPage() {
  const [allRouters, setAllRouters] = useState([]);
  const [selectedRouters, setSelectedRouters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const routerData = [
        { id: 1, name: "Router1", color: "#00FF00" },
        { id: 2, name: "Router2", color: "#FF0000" },
        { id: 3, name: "Router3", color: "#0000FF" },
      ];

      const pcData = [
        { id: 1, name: "PC1", color: "#00FF00", routerId: 1 },
        { id: 2, name: "PC2", color: "#00FF00", routerId: 1 },
        { id: 3, name: "PC3", color: "#FF0000", routerId: 2 },
        { id: 4, name: "PC4", color: "#0000FF", routerId: 3 },
        { id: 5, name: "PC5", color: "#0000FF", routerId: 3 },
      ];

      const routers = routerData.map(
        (router) => new Router(router.id, router.name, router.color)
      );

      const pcs = pcData.map(
        (pc) => new PC(pc.id, pc.name, pc.color, pc.routerId)
      );

      pcs.forEach((pc) => {
        const router = routers.find((r) => r.id === pc.routerId);
        if (router) router.addPC(pc);
      });

      setAllRouters(routers);
      setSelectedRouters(routers); // Отображаем все
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <LeftNavBar allRouters={allRouters} onScan={setSelectedRouters} />
      <ConnectionTree selectedRouters={selectedRouters} />
    </div>
  );
}