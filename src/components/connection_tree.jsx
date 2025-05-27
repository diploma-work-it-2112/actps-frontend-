import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import LeaderLine from "leader-line-new";
import IconNetwork from "../icons/IconNetwork.jsx"; 
import IconPC from "../icons/IconPC.jsx"; 
import api from "../api.jsx";
import PCBlock from "./device_block/pc_block.jsx";
import Router from "../router.jsx";
import RouterBlock from "./device_block/router_block.jsx";

export default function ConnectionTree({ routers, pcs, selectedItems, setSelectedItems }) {
  const screenCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  const linesRef = useRef([]);
	const [lastWarning, setLastWarning] = useState(null);
	const lastWarningIdRef = useRef(null);

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


	const [showWarning, setShowWarning] = useState(false);

// Показывать предупреждение, если новое
useEffect(() => {
  if (lastWarning) {
    setShowWarning(true);
  }
}, [lastWarning]);

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

				const response_2 = await api.get('/warning/last')
				console.log(response_2)
				const warning = await response_2.data
				if (!lastWarningIdRef.current || warning.id !== lastWarningIdRef.current) {
					lastWarningIdRef.current = warning.id;
					console.log("Новое предупреждение:", warning);
					setLastWarning(warning);
				}
				}catch (error){
					console.log(error)
				}
		}

		fetchData()

		const interval = setInterval(() => {
			fetchData()	
		}, 5000);

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
        height: "100%",
        backgroundColor: "#141414",
      }}
    >
      {routers.map((router) => (
		  <RouterBlock router={router} screenCenter={screenCenter} linesRef={linesRef}/>
      ))}

      {pcs.map(
  (pc) =>
    pc && (
		<PCBlock pc={pc} screenCenter={screenCenter} linesRef={linesRef}/>
    )
)}

	  {lastWarning && showWarning && (
  <div className="warning" onClick={() => setShowWarning(false)}>
    <b>Последнее предупреждение:</b> {lastWarning.message} {lastWarning.hostname}
    <div style={{ marginTop: "10px", fontSize: "0.9rem", opacity: 0.8 }}>
      (нажмите, чтобы закрыть)
    </div>
  </div>
)}
    </div>
  );
}
