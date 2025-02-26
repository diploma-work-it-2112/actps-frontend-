import React, { useState, useEffect } from "react";

export default function LeftNavBar({ routers, onScan }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [localRouters, setLocalRouters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLocalRouters([...routers]);
  }, [routers]);

  const toggleNavBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Фильтрация роутеров по имени
    const filteredRouters = routers.filter(
      (router) =>
        router.model_name.toLowerCase().includes(term) ||
        router.computers.some((pc) => pc.hostname.toLowerCase().includes(term))
    );

    setLocalRouters(filteredRouters);
  };

  const handleCheckboxChange = (type, routerIndex, pcIndex = null) => {
    const updatedRouters = [...localRouters];

    if (type === "all") {
      const allChecked = !localRouters.every(
        (router) => router.checked && router.computers.every((pc) => pc.checked)
      );

      updatedRouters.forEach((router) => {
        router.checked = allChecked;
        router.computers.forEach((pc) => (pc.checked = allChecked));
      });
    } else if (type === "router") {
      const router = updatedRouters[routerIndex];
      router.checked = !router.checked;
      router.computers.forEach((pc) => (pc.checked = router.checked));
    } else if (type === "pc") {
      const pc = updatedRouters[routerIndex].computers[pcIndex];
      pc.checked = !pc.checked;
      const router = updatedRouters[routerIndex];
      router.checked = router.computers.every((pc) => pc.checked);
    }

    setLocalRouters(updatedRouters);
  }; 

  const handleScan = () => {
    localRouters.forEach((router) => {
      router.opacity = router.checked ? 1 : 0.2;
      router.computers.forEach((pc) => (pc.opacity = pc.checked ? 1 : 0.2));
    });

    setLocalRouters([...localRouters]);
    onScan(localRouters);
  };

  return (
    <div className={`left-nav-bar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Кнопка открытия/закрытия */}
      <div
        className={`close-open-left-nav-bar ${isCollapsed ? "center" : "right"}`}
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
            {/* Иконка закрытия */}
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
            {/* Иконка открытия */}
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
          {/* Поле поиска */}
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
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Список роутеров */}
          <div className="filter-left-nav-bar">
  <label
    style={{
      color: "#FFFFFF",
      marginLeft: "10px",
      fontWeight: "bold",
      display: "block",
      marginBottom: "10px",
    }}
  >
    <input
      type="checkbox"
      checked={localRouters.every(
        (router) => router.checked && router.computers.every((pc) => pc.checked)
      )}
      onChange={() => handleCheckboxChange("all")}
      style={{ marginRight: "8px" }}
    />
    All
  </label>
  {localRouters.map((router, routerIndex) => (
    <div key={router.id} style={{ marginLeft: "15px", marginBottom: "10px" }}>
      <label
        style={{
          color: "#FFFFFF",
          fontWeight: "bold",
          display: "block",
          marginBottom: "5px",
        }}
      >
        <input
          type="checkbox"
          checked={router.checked || false}
          onChange={() => handleCheckboxChange("router", routerIndex)}
          style={{ marginRight: "8px" }}
        />
        {router.model_name}
      </label>
      {router.computers.map((pc, pcIndex) => (
        <div
          key={pc.id}
          style={{
            marginLeft: "20px",
            marginBottom: "5px",
          }}
        >
          <label style={{ color: "#FFFFFF", display: "block" }}>
            <input
              type="checkbox"
              checked={pc.checked || false}
              onChange={() => handleCheckboxChange("pc", routerIndex, pcIndex)}
              style={{ marginRight: "8px" }}
            />
            {pc.hostname}
          </label>
        </div>
      ))}
    </div>
  ))}
</div>

          {/* Кнопка SCAN */}
          <div className="button-scan-left-nav-bar" onClick={handleScan}>
            <p>SEARCH</p>
          </div>
        </>
      )}
    </div>
  );
}




