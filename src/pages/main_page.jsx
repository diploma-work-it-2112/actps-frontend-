// import React, { useState, useEffect } from "react";
// import Router from "../Entities/classRouter";
// import PC from "../Entities/classPC";
// import ConnectionTree from "../components/connection_tree";
// import LeftNavBar from "../components/navbar";

// export default function MainPage() {
//   const [allItems, setAllItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = [
//         {
//           id: 1,
//           name: "Router1",
//           color: "#00FF00",
//           // opacity: 1,
//           pcs: [
//             { id: 1, name: "PC1", color: "#00FF00", routerId: 1 },
//             { id: 2, name: "PC2", color: "#00FF00", routerId: 1 },
//           ],
//         },
//         {
//           id: 2,
//           name: "Router2",
//           color: "#FF0000",
//           // opacity: 1,
//           pcs: [{ id: 3, name: "PC1", color: "#FF0000", routerId: 2 }],
//         },
//         {
//           id: 3,
//           name: "Router3",
//           color: "#0000FF",
//           // opacity: 1,
//           pcs: [{ id: 4, name: "PC1", color: "#0000FF", routerId: 3 }],
//         },
//       ];

//       setAllItems(data);
//       setSelectedItems(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ display: "flex" }}>
//       <LeftNavBar
//         routers={selectedItems}
//         //  onScan={(selected) => {
//         //   console.log("Scanned Items:", selected);
//         //   setSelectedItems(selected)}}
//         onScan={(selected) => {
//           console.log("Scanned Items:", selected);

//           // Preserve existing checked states
//           const updatedSelectedItems = allItems.map((item) => {
//             const selectedItem = selected.find((sel) => sel.id === item.id);
//             return selectedItem || item;
//           });

//           setSelectedItems(updatedSelectedItems);
//         }}
//       />
//       <ConnectionTree
//         routers={selectedItems}
//         pcs={selectedItems.flatMap((router) => router.pcs)}
//       />
//     </div>
//   );
// }
///////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import Router from "../Entities/classRouter";
// import PC from "../Entities/classPC";
// import ConnectionTree from "../components/connection_tree";
// import LeftNavBar from "../components/navbar";

// export default function MainPage() {
//   const [allItems, setAllItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = [
//         {
//           id: 1,
//           model_name: "Router1",
//           color: "#00FF00",
//           ip_address: "192.168.1.1",
//           hostname: "router1.local",
//           created_at: "2023-01-01T12:00:00Z",
//           pcs: [
//             {
//               id: 1,
//               ip_address: "192.168.1.101",
//               hostname: "pc1.local",
//               router_id: 1,
//               created_at: "2023-01-02T12:00:00Z",
//               color: "#00FF00",
//             },
//             {
//               id: 2,
//               ip_address: "192.168.1.102",
//               hostname: "pc2.local",
//               router_id: 1,
//               created_at: "2023-01-02T12:00:00Z",
//               color: "#00FF00",
//             },
//           ],
//         },
//         {
//           id: 2,
//           model_name: "Router2",
//           color: "#FF0000",
//           ip_address: "192.168.2.1",
//           hostname: "router2.local",
//           created_at: "2023-01-01T12:00:00Z",
//           pcs: [
//             {
//               id: 3,
//               ip_address: "192.168.2.101",
//               hostname: "pc3.local",
//               router_id: 2,
//               created_at: "2023-01-02T12:00:00Z",
//               color: "#FF0000",
//             },
//           ],
//         },
//       ];

//       setAllItems(data);
//       setSelectedItems(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ display: "flex" }}>
//       <LeftNavBar
//         routers={selectedItems}
//         onScan={(selected) => {
//           console.log("Scanned Items:", selected);

//           const updatedSelectedItems = allItems.map((item) => {
//             const selectedItem = selected.find((sel) => sel.id === item.id);
//             return selectedItem || item;
//           });

//           setSelectedItems(updatedSelectedItems);
//         }}
//       />
//       <ConnectionTree
//         routers={selectedItems.map((router) => ({
//           ...router,
//           computers: router.pcs.map((pc) => ({
//             ...pc,
//             router_id: router.id,
//           })),
//         }))}
//         pcs={selectedItems.flatMap((router) => router.pcs)}
//       />
//     </div>
//   );
// }



//////////////////////////
// import React, { useState, useEffect } from "react";
// import Router from "../Entities/classRouter";
// import PC from "../Entities/classPC";
// import ConnectionTree from "../components/connection_tree";
// import LeftNavBar from "../components/navbar";

// export default function MainPage() {
//   const [allItems, setAllItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = [
//                 {
//                   id: 1,
//                   model_name: "Router1",
//                   color: "#00FF00",
//                   ip_address: "192.168.1.1",
//                   hostname: "router1.local",
//                   created_at: "2023-01-01T12:00:00Z",
//                   pcs: [
//                     {
//                       id: 1,
//                       ip_address: "192.168.1.101",
//                       hostname: "pc1.local",
//                       router_id: 1,
//                       created_at: "2023-01-02T12:00:00Z",
//                       color: "#00FF00",
//                     },
//                     {
//                       id: 2,
//                       ip_address: "192.168.1.102",
//                       hostname: "pc2.local",
//                       router_id: 1,
//                       created_at: "2023-01-02T12:00:00Z",
//                       color: "#00FF00",
//                     },
//                   ],
//                 },
//                 {
//                   id: 2,
//                   model_name: "Router2",
//                   color: "#FF0000",
//                   ip_address: "192.168.2.1",
//                   hostname: "router2.local",
//                   created_at: "2023-01-01T12:00:00Z",
//                   pcs: [
//                     {
//                       id: 3,
//                       ip_address: "192.168.2.101",
//                       hostname: "pc3.local",
//                       router_id: 2,
//                       created_at: "2023-01-02T12:00:00Z",
//                       color: "#FF0000",
//                     },
//                   ],
//                 },
//               ];
        
//               setAllItems(data);
//               setSelectedItems(data);
//             };
        
//             fetchData();
//           }, []);

//   return (
//     <div style={{ display: "flex" }}>
//       <LeftNavBar
//         routers={selectedItems}
//         onScan={(selected) => {
//           console.log("Scanned Items:", selected);

//           const updatedSelectedItems = allItems.map((item) => {
//             const selectedItem = selected.find((sel) => sel.id === item.id);
//             // Здесь мы сохраняем все изменения, включая opacity
//             return selectedItem ? { ...selectedItem } : { ...item };
//           });

//           setSelectedItems(updatedSelectedItems);
//         }}
//       />
//       <ConnectionTree
//         routers={selectedItems.map((router) => ({
//           ...router,
//           computers: router.pcs.map((pc) => ({
//             ...pc,
//             router_id: router.id,
//           })),
//         }))}
//         pcs={selectedItems.flatMap((router) => router.pcs)}
//       />
//     </div>
//   );
// }
///////////////////////////////////////tewst/////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import Router from "../Entities/classRouter";
// import PC from "../Entities/classPC";
// import ConnectionTree from "../components/connection_tree";
// import LeftNavBar from "../components/navbar";

// export default function MainPage() {
//   const [allItems, setAllItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = [
//         {
//           id: 1,
//           model_name: "Router1",
//           // color: "#00FF00",
//           ip_address: "192.168.1.1",
//           hostname: "router1.local",
//           created_at: "2023-01-01T12:00:00Z",
//           pcs: [
//             { 
//               id: 1, 
//               ip_address: "192.168.1.101", 
//               hostname: "PC1", 
//               router_id: 1, 
//               // color: "#00FF00", 
//               created_at: "2023-01-02T12:00:00Z" 
//             },
//             { 
//               id: 2, 
//               ip_address: "192.168.1.102", 
//               hostname: "PC2", 
//               router_id: 1, 
//               // color: "#00FF00", 
//               created_at: "2023-01-02T12:00:00Z" 
//             },
//           ],
//         },
//         {
//           id: 2,
//           model_name: "Router2",
//           // color: "#FF0000",
//           ip_address: "192.168.2.1",
//           hostname: "router2.local",
//           created_at: "2023-01-01T12:00:00Z",
//           pcs: [
//             { 
//               id: 3, 
//               ip_address: "192.168.2.101", 
//               hostname: "PC1", 
//               router_id: 2, 
//               // color: "#FF0000", 
//               created_at: "2023-01-02T12:00:00Z" 
//             },
//           ],
//         },
//         {
//           id: 3,
//           model_name: "Router3",
//           // color: "#0000FF",
//           ip_address: "192.168.3.1",
//           hostname: "router3.local",
//           created_at: "2023-01-01T12:00:00Z",
//           pcs: [
//             { 
//               id: 4, 
//               ip_address: "192.168.3.101", 
//               hostname: "PC1", 
//               router_id: 3, 
//               // color: "#0000FF", 
//               created_at: "2023-01-02T12:00:00Z" 
//             },
//           ],
//         },
//       ];

//       setAllItems(data);
//       setSelectedItems(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ display: "flex" }}>
//       <LeftNavBar
//         routers={selectedItems}
//         onScan={(selected) => {
//           console.log("Scanned Items:", selected);

//           // Preserve existing checked states
//           const updatedSelectedItems = allItems.map((item) => {
//             const selectedItem = selected.find((sel) => sel.id === item.id);
//             return selectedItem || item;
//           });

//           setSelectedItems(updatedSelectedItems);
//         }}
//       />
//       <ConnectionTree
//         routers={selectedItems}
//         pcs={selectedItems.flatMap((router) => router.pcs)}
//       />
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////rests////////////
import React, { useState, useEffect } from "react";
import Router from "../Entities/classRouter";
import PC from "../Entities/classPC";
import ConnectionTree from "../components/connection_tree";
import LeftNavBar from "../components/navbar";

export default function MainPage() {
  const [allItems, setAllItems] = useState([]); // Все роутеры
  const [selectedItems, setSelectedItems] = useState([]); // Отфильтрованные/выбранные роутеры

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = [
        {
          id: 1,
          model_name: "Router1",
          ip_address: "192.168.1.1",
          hostname: "router1.local",
          created_at: "2023-01-01T12:00:00Z",
          pcs: [
            { id: 1, ip_address: "192.168.1.101", hostname: "PC1", router_id: 1, created_at: "2023-01-02T12:00:00Z" },
            { id: 2, ip_address: "192.168.1.102", hostname: "PC2", router_id: 1, created_at: "2023-01-02T12:00:00Z" },
          ],
        },
        {
          id: 2,
          model_name: "Router2",
          ip_address: "192.168.2.1",
          hostname: "router2.local",
          created_at: "2023-01-01T12:00:00Z",
          pcs: [
            { id: 3, ip_address: "192.168.2.101", hostname: "PC1", router_id: 2, created_at: "2023-01-02T12:00:00Z" },
          ],
        },
        {
          id: 3,
          model_name: "Router3",
          ip_address: "192.168.3.1",
          hostname: "router3.local",
          created_at: "2023-01-01T12:00:00Z",
          pcs: [
            { id: 4, ip_address: "192.168.3.101", hostname: "PC1", router_id: 3, created_at: "2023-01-02T12:00:00Z" },
          ],
        },
      ];

      // Преобразуем JSON в объекты класса Router
      const routers = jsonData.map((routerData) => new Router(routerData));

      setAllItems(routers);
      setSelectedItems(routers);
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <LeftNavBar
        routers={selectedItems}
        onScan={(scannedItems) => {
          console.log("Scanned Items:", scannedItems);
          setSelectedItems(scannedItems); // Обновляем выбранные маршрутизаторы
        }}
      />
      <ConnectionTree
        routers={selectedItems}
        pcs={selectedItems.flatMap((router) => router.computers)} // ПК из всех выбранных маршрутизаторов
      />
    </div>
  );
}



