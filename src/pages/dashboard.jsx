import { useEffect, useState } from "react"
import api from "../api"
import NetworkOverviewComponent from "../components/dashboardComponents/network_overview_component"

export default function DashboardPage(){

	const [traficLogs, setTraficLogs] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const now = new Date();
			// const isoNow = now.toISOString();

			const minusMinut30 = new Date(now.getTime() - 30*60*1000);
			const isoMinMin30 = minusMinut30.toISOString()

			try{
				const params = {
					from_: isoMinMin30,
					group_by: "sec"
				}
				const response = await api.get("trafic", {params})
				const trafic_logs = response.data
				setTraficLogs(trafic_logs)
				console.log(trafic_logs)
			}catch (error){
				console.log(error)
			}
		}

		fetchData()
	}, [])	

	return(
		<>	
			<div className="dashboard-content">
				{traficLogs && <NetworkOverviewComponent traficLogs={traficLogs} />}
			</div>
		</>
	)
}
