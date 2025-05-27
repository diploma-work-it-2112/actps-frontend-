import React, {useState, useRef, useEffect} from "react";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import IconPC from "../../icons/IconPC";
import { ws } from "msw";


export default function PCBlock({pc, screenCenter, linesRef}){
	const [menuVisible, setMenuVisible] = useState(false);
  	const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  	const containerRef = useRef(null);
	const menuRef = useRef(null);
  	const navigate = useNavigate();

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

	const treeNavigate = () => {
		navigate(`/folder-tree/${pc.ip_address}`);
		setMenuVisible(false)
	}

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

  	return (
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
            position: "relative",
            opacity: pc.opacity || 1,
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            margin: "50px",
          }}
        >
        
          <div //Внешний эффект (фон + пунктирная граница)
            style={{
				backgroundColor: pc.is_work ? `${pc.color}23` : 'rgba(217, 217, 217, 0.137)',
				border: pc.is_work ? `2px dotted ${pc.color}` : '2px dotted rgba(255,255,255,1)',
			}}
			className="external-effect"
          />

          <span //Имя ПК (hostname)
            style={{
              position: "absolute",
              bottom: "-12px",
              color: "#FFF",
              fontSize: "14px",
              fontWeight: "bold",
              zIndex: "2",
            }}
          >
            {pc.hostname}
          </span>

       
          <div
            style={{ //Блок с иконкой ПК
				backgroundColor: pc.is_work ? pc.color : "#4f4f4f",
              	borderRadius: "12px",
              	width: "60px",
              	height: "60px",
              	display: "flex",
              	alignItems: "center",
              	justifyContent: "center",
              	boxShadow: pc.is_work ? `0 0 8px ${pc.color}` : "",
              	zIndex: "3",
            }}
			ref={containerRef}
			onContextMenu={handleContextMenu}
          >
            	<IconPC style={{ width: "55px", height: "55px" }} />
				<div
			    	className={pc.is_work ? "work-indicator" : "not-work-indicator"}
			    	style={{ border: `solid 3px #141414` }}
				/>
          	</div>
			
			{menuVisible && (
				<div className="device-menu" style={{top: menuPos.y, left: menuPos.x}}
				ref={menuRef}>
					<p
					  	className={!pc.is_work ? "device-menu-p-not-active" : "device-menu-p"}
					  	onClick={pc.is_work ? handleNavigate : undefined}
					>
					  Performance
					</p>

					<p
					  	className="device-menu-p-not-active"
					>
					  Properties
					</p>

					<p
					  	className="device-menu-p-not-active"
					>
					  Edit
					</p>

					<p
					  	className={!pc.is_work ? "device-menu-p-not-active" : "device-menu-p"}
					  	onClick={pc.is_work ? treeNavigate : undefined}
					>
					  Directory
					</p>
				</div>
			)}
        </div>
      </Draggable>
  );
}
