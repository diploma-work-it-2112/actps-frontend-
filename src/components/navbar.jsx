// import React, { useState } from "react";

// export default function LeftNavBar() {
//   const [isCollapsed, setIsCollapsed] = useState(false); // Состояние для контроля сворачивания

//   const toggleNavBar = () => {
//     setIsCollapsed(!isCollapsed); // Меняем состояние при клике
//   };

//   return (
//     <>
//       <div className={`left-nav-bar ${isCollapsed ? "collapsed" : ""}`}>
//         <div className={`close-open-left-nav-bar ${isCollapsed ? "center" : "right"}`} onClick={toggleNavBar}>
//           {isCollapsed ? (
//             // Новый SVG при свернутом состоянии
//             <svg
//               width="28"
//               height="24"
//               viewBox="0 0 28 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M2 2L12 12L2 2ZM12 12L2 22L12 12Z" fill="#141414" />
//               <path
//                 d="M2 2L12 12L2 22"
//                 stroke="#D0D0D0"
//                 strokeWidth="4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path d="M16 2L26 12L16 2ZM26 12L16 22L26 12Z" fill="#141414" />
//               <path
//                 d="M16 2L26 12L16 22"
//                 stroke="#D0D0D0"
//                 strokeWidth="4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           ) : (
//             // Исходный SVG при развернутом состоянии
//             <svg
//               width="28"
//               height="24"
//               viewBox="0 0 28 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M0.585786 10.5858C0.210713 10.9609 0 11.4696 0 12C0 12.5304 0.210713 13.0391 0.585786 13.4142L10.5858 23.4142C11.3668 24.1953 12.6332 24.1953 13.4142 23.4142C14.1953 22.6332 14.1953 21.3668 13.4142 20.5858L4.82843 12L13.4142 3.41421C14.1953 2.63317 14.1953 1.36684 13.4142 0.585787C12.6332 -0.195262 11.3668 -0.195262 10.5858 0.585787L0.585786 10.5858ZM14.5858 10.5858C14.2107 10.9609 14 11.4696 14 12C14 12.5304 14.2107 13.0391 14.5858 13.4142L24.5858 23.4142C25.3668 24.1953 26.6332 24.1953 27.4142 23.4142C28.1953 22.6332 28.1953 21.3668 27.4142 20.5858L18.8284 12L27.4142 3.41421C28.1953 2.63317 28.1953 1.36684 27.4142 0.585787C26.6332 -0.195262 25.3668 -0.195262 24.5858 0.585787L14.5858 10.5858Z"
//                 fill="#D0D0D0"
//               />
//             </svg>
//           )}
//         </div>
//         {!isCollapsed && (
//           <>
//             <div className="search-left-nav-bar">
// 				<div className="search-left-nav-bar-search">
// 					<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
// <circle cx="8.13043" cy="8.13043" r="6.63043" stroke="#D0D0D0" stroke-width="3"/>
// <path d="M14.0435 13.3043L18.4782 17" stroke="#D0D0D0" stroke-width="4" stroke-linecap="round"/>
// </svg>

// 				</div>
// 				<input
// 				type="text"
// 				placeholder="Search..."
// 				className="search-left-nav-bar-text"
// 			  />	
// 			</div>
//             <div className="filter-left-nav-bar"></div>
//             <div className="button-scan-left-nav-bar">
//               <p>SCAN</p>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }
/////////////////////////////////////////////////////////////testin left-nav-bar///////////
// import React, { useState, useEffect } from "react";

// export default function LeftNavBar({objts}) {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [routers, setRouters] = useState([]);

//   const toggleNavBar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   useEffect(() => {
//     // Имитация получения данных с бэкенда
//     const fetchRouters = async () => {
//       const response = await new Promise((resolve) => {
//         setTimeout(() => {
//           resolve([
//             {
//               name: 'Router1',
//               pcs: [
//                 { name: 'PC1', checked: false },
//               ],
//               checked: false
//             },
//             {
//               name: 'Router2',
//               pcs: [
//                 { name: 'PC2', checked: false }
//               ],
//               checked: false
//             },
//             {
//               name: 'Router3',
//               pcs: [
//                 { name: 'PC3', checked: false }
//               ],
//               checked: false
//             }
//           ]);
//         }, 1000);
//       });
//       setRouters(response);
//     };

//     fetchRouters();
//   }, []);

//   // Функция для изменения состояния чекбокса
//   const handleCheckboxChange = (type, index, pcIndex = null) => {
//     if (type === 'all') {
//       const allChecked = !routers.every(router => router.checked && router.pcs.every(pc => pc.checked));
//       setRouters(prevRouters => 
//         prevRouters.map(router => ({
//           ...router,
//           checked: allChecked,
//           pcs: router.pcs.map(pc => ({ ...pc, checked: allChecked }))
//         }))
//       );
//     } else if (type === 'router') {
//       setRouters(prevRouters => 
//         prevRouters.map((router, i) => 
//           i === index ? {
//             ...router,
//             checked: !router.checked,
//             pcs: router.pcs.map(pc => ({ ...pc, checked: !router.checked }))
//           } : router
//         )
//       );
//     } else if (type === 'pc') {
//       setRouters(prevRouters => 
//         prevRouters.map((router, i) => 
//           i === index ? {
//             ...router,
//             pcs: router.pcs.map((pc, j) => 
//               j === pcIndex ? { ...pc, checked: !pc.checked } : pc
//             )
//           } : router
//         )
//       );
//     }
//   };

//   return (
//     <>
//       <div className={`left-nav-bar ${isCollapsed ? "collapsed" : ""}`}>
//         <div className={`close-open-left-nav-bar ${isCollapsed ? "center" : "right"}`} onClick={toggleNavBar}>
//           {isCollapsed ? (
//             <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M2 2L12 12L2 2ZM12 12L2 22L12 12Z" fill="#141414" />
//               <path d="M2 2L12 12L2 22" stroke="#D0D0D0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
//               <path d="M16 2L26 12L16 2ZM26 12L16 22L26 12Z" fill="#141414" />
//               <path d="M16 2L26 12L16 22" stroke="#D0D0D0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           ) : (
//             <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path fillRule="evenodd" clipRule="evenodd" d="M0.585786 10.5858C0.210713 10.9609 0 11.4696 0 12C0 12.5304 0.210713 13.0391 0.585786 13.4142L10.5858 23.4142C11.3668 24.1953 12.6332 24.1953 13.4142 23.4142C14.1953 22.6332 14.1953 21.3668 13.4142 20.5858L4.82843 12L13.4142 3.41421C14.1953 2.63317 14.1953 1.36684 13.4142 0.585787C12.6332 -0.195262 11.3668 -0.195262 10.5858 0.585787L0.585786 10.5858ZM14.5858 10.5858C14.2107 10.9609 14 11.4696 14 12C14 12.5304 14.2107 13.0391 14.5858 13.4142L24.5858 23.4142C25.3668 24.1953 26.6332 24.1953 27.4142 23.4142C28.1953 22.6332 28.1953 21.3668 27.4142 20.5858L18.8284 12L27.4142 3.41421C28.1953 2.63317 28.1953 1.36684 27.4142 0.585787C26.6332 -0.195262 25.3668 -0.195262 24.5858 0.585787L14.5858 10.5858Z" fill="#D0D0D0" />
//             </svg>
//           )}
//         </div>
//         {!isCollapsed && (
//           <>
//             <div className="search-left-nav-bar">
//               <div className="search-left-nav-bar-search">
//                 <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <circle cx="8.13043" cy="8.13043" r="6.63043" stroke="#D0D0D0" strokeWidth="3"/>
//                   <path d="M14.0435 13.3043L18.4782 17" stroke="#D0D0D0" strokeWidth="4" strokeLinecap="round"/>
//                 </svg>
//               </div>
//               <input type="text" placeholder="Search..." className="search-left-nav-bar-text" />	
//             </div>
//             <div className="filter-left-nav-bar">
//               <label style={{ color: "#FFFFFF", display: "block", marginLeft:"30px",marginTop:"15px", marginBottom: "10px" }}>
//                 <input 
//                   type="checkbox" 
//                   checked={routers.every(router => router.checked && router.pcs.every(pc => pc.checked))}
//                   onChange={() => handleCheckboxChange('all', 0)}
//                 />
//                 All
//               </label>
//               {routers.map((router, index) => (
//                 <div key={index}>
//                   <label style={{ color: "#FFFFFF", display: "block", marginLeft:"15px", marginBottom: "5px" }}>
//                     <input 
//                       type="checkbox" 
//                       checked={router.checked}
//                       onChange={() => handleCheckboxChange('router', index)}
//                     />
//                     {router.name}
//                   </label>
//                   {router.pcs.map((pc, pcIndex) => (
//                     <div key={pcIndex} style={{ marginLeft: '20px' }}>
//                       <label style={{ color: "#FFFFFF", display: "block", marginLeft:"15px", marginBottom: "10px" }}>
//                         <input 
//                           type="checkbox" 
//                           checked={pc.checked}
//                           onChange={() => handleCheckboxChange('pc', index, pcIndex)}
//                         />
//                         {pc.name}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//             <div className="button-scan-left-nav-bar">
//               <p>SCAN</p>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }
/////////////////////////////////////////Test///
import React, { useState } from "react";

export default function LeftNavBar({ allRouters, onScan }) {
  const [selectedRouters, setSelectedRouters] = useState(allRouters);

  const handleCheckboxChange = (type, routerIndex, pcIndex = null) => {
    setSelectedRouters((prev) =>
      prev.map((router, i) => {
        if (type === "all") {
          const allChecked = !prev.every(
            (r) => r.checked && r.pcs.every((pc) => pc.checked)
          );
          return {
            ...router,
            checked: allChecked,
            pcs: router.pcs.map((pc) => ({ ...pc, checked: allChecked })),
          };
        } else if (type === "router" && i === routerIndex) {
          const newChecked = !router.checked;
          return {
            ...router,
            checked: newChecked,
            pcs: router.pcs.map((pc) => ({ ...pc, checked: newChecked })),
          };
        } else if (type === "pc" && i === routerIndex) {
          return {
            ...router,
            pcs: router.pcs.map((pc, j) =>
              j === pcIndex ? { ...pc, checked: !pc.checked } : pc
            ),
          };
        }
        return router;
      })
    );
  };

  const handleScan = () => {
    const filteredRouters = selectedRouters.filter(
      (router) => router.checked || router.pcs.some((pc) => pc.checked)
    );
    onScan(filteredRouters);
  };

  return (
    <div className="left-nav-bar">
      <h3>Routers and PCs</h3>
      <label>
        <input
          type="checkbox"
          checked={selectedRouters.every(
            (router) => router.checked && router.pcs.every((pc) => pc.checked)
          )}
          onChange={() => handleCheckboxChange("all")}
        />
        All
      </label>
      {selectedRouters.map((router, routerIndex) => (
        <div key={router.id}>
          <label>
            <input
              type="checkbox"
              checked={router.checked}
              onChange={() => handleCheckboxChange("router", routerIndex)}
            />
            {router.name}
          </label>
          <div style={{ paddingLeft: "20px" }}>
            {router.pcs.map((pc, pcIndex) => (
              <label key={pc.id}>
                <input
                  type="checkbox"
                  checked={pc.checked}
                  onChange={() =>
                    handleCheckboxChange("pc", routerIndex, pcIndex)
                  }
                />
                {pc.name}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleScan}>SCAN</button>
    </div>
  );
}