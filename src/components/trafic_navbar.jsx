import React, { useState, useEffect } from "react";

export default function TraficLeftNavBar({ pcs, ipParams, setIpParams, protoParams, setProtoParams}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [localRouters, setLocalRouters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const toggleNavBar = () => {
    setIsCollapsed(!isCollapsed);
  };

	const protocols = [
    { label: "HTTP", color: "#8899AA" },
    { label: "HTTPS", color: "#AABBDD" },
    { label: "TCP", color: "#4A69C9" },
    { label: "UDP", color: "#8CBF55" },
    { label: "ICMP", color: "#C14AAE" },
    { label: "IPv6", color: "#4BB9A7" },
    { label: "ARP", color: "#C19751" },
    { label: "DNS", color: "#6B57C9" },
  ];

	function generateColor(index, saturation = 0.5, brightness = 0.95) {
  const goldenRatioConjugate = 0.618033988749895;
  const h = (index * goldenRatioConjugate) % 1;
  
  function hsvToRgb(h, s, v) {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v; g = t; b = p;
        break;
      case 1:
        r = q; g = v; b = p;
        break;
      case 2:
        r = p; g = v; b = t;
        break;
      case 3:
        r = p; g = q; b = v;
        break;
      case 4:
        r = t; g = p; b = v;
        break;
      case 5:
        r = v; g = p; b = q;
        break;
      default:
        r = 0; g = 0; b = 0;
    }
    return { r, g, b };
  }

  const { r, g, b } = hsvToRgb(h, saturation, brightness);

  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.padStart(2, '0');
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

	const handleClick = (protocol) => {
    	setProtoParams(protocol);
		console.log(protoParams)
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

				<div className="trafic-ip-filter-block">
		  			<p className="ip-filter-title">IP Filter</p>
		  			<div className="ip-filter-list">
						{pcs.map((pc, index) => {
						  // Активен, если ipParams равен "all" или совпадает с адресом текущего элемента
						  const isActive = ipParams === "all" || ipParams === pc.ip_address;
						  return (
							<div
							  key={pc.ip_address + index}
							  className={isActive ? "ip-block" : "ip-not-active"}
							  style={{
								backgroundColor: isActive ? generateColor(index) : "transparent"
							  }}
							  onClick={() => setIpParams(pc.ip_address)}
							>
							  <p>{pc.ip_address}</p>
							</div>
						  );
						})}

						<div
						  className={ipParams === "all" ? "ip-all" : "ip-all ip-all-not-active"}
						  onClick={() => setIpParams("all")}
						>
						  <p>ALL</p>
						</div>
		  	
		  			</div>
		  		</div>

		  		
				<div className="trafic-ip-filter-block">
		  			<p className="ip-filter-title">Protocol Filter</p>
					<div className="ip-filter-list">
						<div
						  className={protoParams === "all" ? "ip-all" : "ip-not-active"}
						  onClick={() => handleClick("all")}
						>
						  <p>ALL</p>
						</div>

						{protocols.map((proto, index) => {
						  const isActive = protoParams === "all" || protoParams === proto.label;
						  return (
							<div
							  key={proto.label}
							  className={`${isActive ? "ip-block" : "ip-not-active"}`}
							  style={{ backgroundColor: (protoParams === "all" || protoParams === proto.label) ? proto.color : "#141414" }}
							  onClick={() => handleClick(proto.label)}
							>
							  <p>{proto.label}</p>
							</div>
						  );
						})}
					  </div>

		  		</div>
		  	  </>
	  )}
    </div>
  );
}





