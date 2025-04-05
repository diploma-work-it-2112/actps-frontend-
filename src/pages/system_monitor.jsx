import { useParams } from "react-router-dom";
import LoadingSystem from "../components/system_monitor_components/loading_system";
import Loges from "../components/system_monitor_components/loges";
import AllProcesses from "../components/system_monitor_components/processes";

export default function SystemMonitor(){


	return(
		<div className="system-monitor-content">
			<div className="system-loading-loges-content">
				<LoadingSystem />
				<Loges hostname="computers-name"/>
			</div>
			<AllProcesses />
		</div>
	)
}
