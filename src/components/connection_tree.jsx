import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import LeaderLine from "leader-line-new";
import IconNetwork from "../icons/IconNetwork.jsx"; 
import IconPC from "../icons/IconPC.jsx"; 
import api from "../api.jsx";

export default function ConnectionTree({ routers, pcs, selectedItems, setSelectedItems }) {
  const screenCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  const linesRef = useRef([]);

  useEffect(() => {
    // Создание соединительных линий
    const newLines = pcs
      .map((pc) => {
        const router = routers.find((r) => r.id === pc.router_id);
        if (router) {
          const routerElement = document.getElementById(`router-${router.id}`);
          const pcElement = document.getElementById(`pc-${pc.id}`);
          if (routerElement && pcElement) {
            return new LeaderLine(routerElement, pcElement, {
              color:pc.is_work ? router.color : "#4f4f4f",
              size: 4,
              endPlug: "behind",
              startSocket: "right",
              endSocket: "left",
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

    // Очистка линий при размонтировании
    return () => {
      linesRef.current.forEach((line) => line.remove());
      window.removeEventListener("resize", updateLines);
    };
  }, [pcs, routers]);

	useEffect(() => {
		
		const fetchData = async () => {
			try{
				const response = await api.get('/pc/heartbeat')
				console.log(response)
				console.log(routers)
				const working_list = response.data["result"]
				if (response.status === 200) {
					console.log(selectedItems)
					const updatedRouters = routers.map((router) => {
						const updatedComputers = router.computers.map((pc) => {
							let is_work = false;
							let w_ip = pc.ip_address;
							Object.entries(working_list).forEach(([w_key, w_value]) => {
						  		if (pc.hostname === w_key) {
									is_work = true;
									w_ip = w_value;
						  		}
							});
							return { ...pc, is_work, ip_address: w_ip };
					  	});
						console.log(updatedComputers)
					  	return { ...router, computers: updatedComputers };
					});
				
					console.log(updatedRouters)

					setSelectedItems(updatedRouters);
					console.log(pcs)
					}	
				}catch (error){
					console.log(error)
				}
		}

		fetchData()

		const interval = setInterval(() => {
			fetchData()	
		}, 30000);

		return () => clearInterval(interval);
	}, [])


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
      {routers.map((router) => (
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
            >
              <IconNetwork style={{ width: "55px", height: "55px" }} />
            </div>
          </div>
        </Draggable>
      ))}

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
            position: "relative",
            opacity: pc.opacity || 1,
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
        
          <div //Внешний эффект (фон + пунктирная граница)
            style={{
				backgroundColor: pc.is_work ? `${pc.color}23` : 'rgba(217, 217, 217, 0.137)',
				border: pc.is_work ? `2px dotted ${pc.color}` : '2px dotted rgba(255,255,255,1)',
			}}
			className="external-effect"
          />

        	<a href={"monitoring-system/"}>
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
          >
            <IconPC style={{ width: "55px", height: "55px" }} />
			<div
			    className={pc.is_work ? "work-indicator" : "not-work-indicator"}
			    style={{ border: `solid 3px #141414` }}
			/>
          </div>
		</a>
        </div>
      </Draggable>
    )
)}
    </div>
  );
}
