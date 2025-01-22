import { useState, useEffect } from "react";

export default function AllProcesses() {
	  const [processes, setProcesses] = useState([]);

	  useEffect(() => {
			const ws = new WebSocket("ws://127.0.0.1:8000/v1/ws/process");

			
			ws.onopen = () => {
			  	console.log("WebSocket соединение установлено.");
			};

			
			ws.onmessage = (event) => {
			  	console.log("Получено сообщение:", event.data);
			  	try {
					const data = JSON.parse(event.data); 
					setProcesses(data);
			  	} catch (error) {
					console.error("Ошибка при парсинге данных:", error);
			  	}
			};

			
			ws.onerror = (error) => {
			  	console.error("WebSocket ошибка:", error);
			};

			ws.onclose = () => {
			 	 console.log("WebSocket соединение закрыто.");
			};

		
			return () => {
			  	ws.close();
			};
	  }, []); 

	return (
	<div className="system-processes-content">
		<div className="system-processes-table">
			<div className="system-processes-table-title">
				<p>Name</p>
				<p>PID</p>
				<p>CPU</p>
				<p>Memory</p>
			</div>

			{processes.map((process, index) => (
				<div key={index} className="system-process-row">
					<p>{process.name}</p>
					<p>{process.pid}</p>
					<p>{process.cpu_usage}</p>
					<p>{process.memory_usage}</p>
				</div>
			))}
			</div>
		</div>
	);
}

