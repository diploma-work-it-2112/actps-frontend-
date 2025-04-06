import { useParams } from "react-router-dom";
import LoadingSystem from "../components/system_monitor_components/loading_system";
import Loges from "../components/system_monitor_components/loges";
import AllProcesses from "../components/system_monitor_components/processes";

export default function SystemMonitor(){
	const {hostname, ip_address} = useParams()

	return(
		<div className="system-monitor-content">
			<div className="system-loading-loges-content">
				<LoadingSystem ip_address={ip_address}/>
				<Loges hostname="computers-name" ip_address={ip_address}/>
			</div>
			<AllProcesses ip_address={ip_address}/>
		</div>
	)
}
