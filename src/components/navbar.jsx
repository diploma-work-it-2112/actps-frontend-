import React, { useState, useEffect } from "react";
import Router from "../Entities/classRouter";

export default function LeftNavBar({ routers: initialRouters, onScan }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [routers, setRouters] = useState([]);

  const toggleNavBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (routers.length === 0) {
      const initializedRouters = initialRouters.map(
        (router) =>
          new Router(
            router.id,
            router.name,
            router.color,
            router.opacity,
            router.pcs
          )
      );
      setRouters(initializedRouters);
    }
  }, [initialRouters]);
  

  const handleCheckboxChange = (type, index, pcIndex = null) => {
    console.log("Checkbox change:", type, index, pcIndex);

    if (type === "all") {
      const allChecked = !routers.every(
        (router) => router.checked && router.pcs.every((pc) => pc.checked)
      );

      const updatedRouters = routers.map((router) => ({
        ...router,
        checked: allChecked,
        pcs: router.pcs.map((pc) => ({
          ...pc,
          checked: allChecked,
        })),
      }));

      setRouters(updatedRouters);
    } else if (type === "router") {
      const updatedRouters = routers.map((router, i) => {
        if (i === index) {
          const newChecked = !router.checked;
          return {
            ...router,
            checked: newChecked,
            pcs: router.pcs.map((pc) => ({
              ...pc,
              checked: newChecked,
            })),
          };
        }
        return router;
      });

      setRouters(updatedRouters);
    } else if (type === "pc") {
      const updatedRouters = routers.map((router, i) => {
        if (i === index) {
          return {
            ...router,
            pcs: router.pcs.map((pc, j) => {
              if (j === pcIndex) {
                return {
                  ...pc,
                  checked: !pc.checked,
                };
              }
              return pc;
            }),
          };
        }
        return router;
      });

      setRouters(updatedRouters);
    }
  };

  const handleScan = () => {
    const updatedRouters = routers.map((router) => {
      const isRouterChecked = router.checked || router.pcs.some((pc) => pc.checked);
  
      return {
        ...router,
        checked: isRouterChecked, // Ensure the checked state is preserved
        opacity: isRouterChecked ? 1 : 0.2,
        pcs: router.pcs.map((pc) => ({
          ...pc,
          opacity: pc.checked ? 1 : 0.2,
        })),
      };
    });
  
    console.log("Updated Routers after scan:", updatedRouters);
    setRouters([...updatedRouters]);
    onScan(updatedRouters);
  };

  return (
    <div className={`left-nav-bar ${isCollapsed ? "collapsed" : ""}`}>
      <div
        className={`close-open-left-nav-bar ${
          isCollapsed ? "center" : "right"
        }`}
        onClick={toggleNavBar}
      >
        {isCollapsed ? (
          <svg
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 2L12 12L2 2ZM12 12L2 22L12 12Z" fill="#141414" />
            <path
              d="M2 2L12 12L2 22"
              stroke="#D0D0D0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M16 2L26 12L16 2ZM26 12L16 22L26 12Z" fill="#141414" />
            <path
              d="M16 2L26 12L16 22"
              stroke="#D0D0D0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.585786 10.5858C0.210713 10.9609 0 11.4696 0 12C0 12.5304 0.210713 13.0391 0.585786 13.4142L10.5858 23.4142C11.3668 24.1953 12.6332 24.1953 13.4142 23.4142C14.1953 22.6332 14.1953 21.3668 13.4142 20.5858L4.82843 12L13.4142 3.41421C14.1953 2.63317 14.1953 1.36684 13.4142 0.585787C12.6332 -0.195262 11.3668 -0.195262 10.5858 0.585787L0.585786 10.5858ZM14.5858 10.5858C14.2107 10.9609 14 11.4696 14 12C14 12.5304 14.2107 13.0391 14.5858 13.4142L24.5858 23.4142C25.3668 24.1953 26.6332 24.1953 27.4142 23.4142C28.1953 22.6332 28.1953 21.3668 27.4142 20.5858L18.8284 12L27.4142 3.41421C28.1953 2.63317 28.1953 1.36684 27.4142 0.585787C26.6332 -0.195262 25.3668 -0.195262 24.5858 0.585787L14.5858 10.5858Z"
              fill="#D0D0D0"
            />
          </svg>
        )}
      </div>
      {!isCollapsed && (
        <>
          <div className="search-left-nav-bar">
            <div className="search-left-nav-bar-search">
              <svg
                width="21"
                height="19"
                viewBox="0 0 21 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="8.13043"
                  cy="8.13043"
                  r="6.63043"
                  stroke="#D0D0D0"
                  strokeWidth="3"
                />
                <path
                  d="M14.0435 13.3043L18.4782 17"
                  stroke="#D0D0D0"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="search-left-nav-bar-text"
            />
          </div>
          <div className="filter-left-nav-bar">
            <label
              style={{
                color: "#FFFFFF",
                marginLeft: "30px",
                marginTop: "15px",
                marginBottom: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={routers.every(
                  (router) =>
                    router.checked && router.pcs.every((pc) => pc.checked)
                )}
                onChange={() => handleCheckboxChange("all")}
              />
              All
            </label>
            {routers.map(
              (router, index) => (
                (
                  <div key={router.id}>
                    <label
                      style={{
                        color: "#FFFFFF",
                        marginLeft: "15px",
                        marginBottom: "5px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={router.checked}
                        onChange={() => handleCheckboxChange("router", index)}
                      />
                      {router.name}
                    </label>
                    {router.pcs.map((pc, pcIndex) => (
                      <div key={pc.id} style={{ marginLeft: "20px" }}>
                        <label
                          style={{
                            color: "#FFFFFF",
                            marginLeft: "15px",
                            marginBottom: "10px",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={pc.checked}
                            onChange={() =>
                              handleCheckboxChange("pc", index, pcIndex)
                            }
                          />
                          {pc.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )
              )
            )}
          </div>
          <div className="button-scan-left-nav-bar" onClick={handleScan}>
            <p>SCAN</p>
          </div>
        </>
      )}
    </div>
  );
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
