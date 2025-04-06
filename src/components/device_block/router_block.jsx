import React, {useState, useRef, useEffect} from "react";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import IconPC from "../../icons/IconPC";
import IconNetwork from "../../icons/IconNetwork";
import RouterPropertiesBlock from "./router_prop";


export default function RouterBlock({router, screenCenter, linesRef}){
	const [menuVisible, setMenuVisible] = useState(false);
  	const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  	const containerRef = useRef(null);
	const menuRef = useRef(null);
  	const navigate = useNavigate();

	const [propertyBlockVisible, setPropertyBlockVis] = useState(false);

  	const handleContextMenu = (e) => {
    	e.preventDefault();
    	// Получаем позицию блока на экране
    	const rect = containerRef.current.getBoundingClientRect();
    	// Рассчитываем координаты меню относительно контейнера
    	const x = e.clientX - rect.left;
    	const y = e.clientY - rect.top;
    	setMenuPos({ x, y });
    	setMenuVisible(true);
  	};

  	const handleCloseMenu = () => {
    	setMenuVisible(false);
  	};

  	const handleNavigate = () => {
    	// Переход на страницу с использованием pc.id
    	navigate(`/monitoring-system/${pc.hostname}/${pc.ip_address}`);
    	setMenuVisible(false);
  	};

	useEffect(() => {
		const handleMouseMove = (e) => {
		  	// Если меню не видно, ничего не делаем
			if (!menuVisible) return;

		 	const containerRect = containerRef.current.getBoundingClientRect();
    		const menuRect = menuRef.current ? menuRef.current.getBoundingClientRect() : null;

			// Проверяем, находится ли курсор внутри контейнера
			const isInContainer =
				e.clientX >= containerRect.left &&
				e.clientX <= containerRect.right &&
				e.clientY >= containerRect.top &&
				e.clientY <= containerRect.bottom;

			// Проверяем, находится ли курсор внутри меню (если меню существует)
			const isInMenu = menuRect &&
				e.clientX >= menuRect.left &&
				e.clientX <= menuRect.right &&
				e.clientY >= menuRect.top &&
				e.clientY <= menuRect.bottom;

			if (!isInContainer && !isInMenu) {
				setMenuVisible(false);
			}		
		};

		document.addEventListener("mousemove", handleMouseMove);
		return () => {
		  	document.removeEventListener("mousemove", handleMouseMove);
		};
	  }, [menuVisible]);

	return(
		<>
		<Draggable
          key={router.id}
          defaultPosition={{
            x: screenCenter.x + 150,
            y: screenCenter.y / 50,
          }}
          onDrag={() => {
            linesRef.current.forEach((line) => line.position());
          }}
        >
          <div
            id={`router-${router.id}`}
            style={{
              position: "relative",
              opacity: router.opacity || 1,
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              cursor: "pointer",
              margin: "50px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-12px",
                left: "-12px",
                right: "-12px",
                bottom: "-15px",
                backgroundColor: `${router.color}23`,
                border: `2px dotted ${router.color}`,
                borderRadius: "29px",
                zIndex: "1",
              }}
            />

            <span
              style={{
                position: "absolute",
                bottom: "-12px",
                color: "#FFF",
                fontSize: "14px",
                fontWeight: "bold",
                zIndex: "2",
              }}
            >
              {router.model_name}
            </span>

            <div
              style={{
                backgroundColor: router.color,
                borderRadius: "12px",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 8px ${router.color}`,
                zIndex: "3",
              }}
				ref={containerRef}
				onContextMenu={handleContextMenu}
            >
              <IconNetwork style={{ width: "55px", height: "55px" }} />
            </div>
			{menuVisible && (
				<div className="device-menu" style={{top: menuPos.y, left: menuPos.x}}
				ref={menuRef}>
					<p
					  	className="device-menu-p-not-active"
					>
					  Performance
					</p>

					<p
					  	className={!router.is_work ? "device-menu-p-not-active" : "device-menu-p"}
						onClick={router.is_work ? () => setPropertyBlockVis(true) : undefined}	
					>
					  Properties
					</p>

					<p
					  	className={!router.is_work ? "device-menu-p-not-active" : "device-menu-p"}
					>
					  Edit
					</p>
				</div>
			)}

			

          </div>
        </Draggable>
		{propertyBlockVisible && (
				<RouterPropertiesBlock router={router} handleClose={() => setPropertyBlockVis(false)} />
			)}
	</>
	)
}
