import { useEffect, useState } from "react";

export default function Loges({hostname, ip_address}){

	const [logs, setLogs] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://127.0.0.1:8000/v1/log/package/${hostname}`)
			console.log(response)
			const data = await response.json()
			setLogs(data)
		}
		fetchData();
	}, [hostname])
	
	return(
		<div className="loges-content">
			{logs.map((log, index) => {
			  return (
				<div key={index} className="system-log-row">
				  <div className="log-type">
					FIsh
				  </div>
				  <div className="log-content">
				  	<div className="log-web-hostname">{log.web_host_name}</div>
					<div className="log-metadata">
						<div className="log-column">
							<p><span className="log-c-s">ip_dst:</span> {log.ip_destination}</p>
							<p><span className="log-c-s">ip_src:</span> {log.ip_source}</p>
						</div>

						<div className="log-column">
							<p><span className="log-c-s">port_dst:</span> {log.port_destination}</p>
							<p><span className="log-c-s">port_src:</span> {log.port_source}</p>
						</div>

						<div className="log-column">
							<p><span className="log-c-s">mac_dst:</span> {log.mac_destination}</p>
							<p><span className="log-c-s">mac_src:</span> {log.mac_source}</p>
						</div>

					</div>
				  </div>
				</div>
			  );
			})}
		</div>
	)
}
