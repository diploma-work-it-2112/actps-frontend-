import { useState } from 'react';
import {
	BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';


export default function NetworkOverviewComponent({traficLogs}){
	console.log(traficLogs)

	const [barchartNetworkType, setBarchartNetworkType] = useState("num_proto")

	const protocolColorMap = [
	  '#39ff14', // Ether — неоново-зелёный
	  '#00ffff', // IPv4 — неоновый голубой
	  '#ff1493', // TCP — глубокий розовый (заменён)
	  '#ff9933', // UDP — ярко-оранжевый
	  '#fefe33', // ICMP — неоновый жёлтый
	  '#8a2be2', // IPv6 — фиолетовый бархат (заменён)
	  '#00ffcc', // ARP — морской неон
	  '#ff6ec7', // DNS — розово-фиолетовый
	  '#da70d6', // HTTP — неоновая сирень
	  '#1e90ff', // HTTPS — синий
	  '#bbbbbb'  // Unknown — светло-серый
	];


	const protocols = [
		"Ether", "IPv4", "TCP", "UDP", "ICMP",
	  	"IPv6", "ARP", "DNS", "HTTP", "HTTPS", "Unknown"
	];


	const CustomTooltip = ({ active, payload, label }) => {
		if (!active || !payload?.length) return null;

  		return (
    		<div style={{
      			background: 'rgba(0,0,0,0.85)',
      			padding: '10px 14px',
			  	borderRadius: '8px',
			  	border: '1px solid #00ffff',
			  	color: '#00ffff',
    		}}>
      		<p style={{ marginBottom: 4 }}>{label}</p>
      		{payload.map((entry, idx) => (
        		<p key={idx} style={{ color: entry.color }}>
          			{entry.name}: {entry.value}
        		</p>
      		))}
    		</div>
  		);
	};


	const generateChartData = (logs, type) => {
		const allKeys = new Set();
	  	logs.forEach(log => {
			const obj = log[type] || {};
			Object.keys(obj).forEach(k => allKeys.add(k));
	  	});

	  	const keysArray = Array.from(allKeys);

	  	return logs.map(log => {
			const entry = { name: new Date(log.time * 1000).toLocaleTimeString() };
			const obj = log[type] || {};
			keysArray.forEach(k => {
		  		entry[k] = obj[k] || 0;
			});
			return entry;
	  	});
	};

	const getRandomColor = () => {
  		const h = Math.floor(Math.random() * 360);
  		return `hsl(${h}, 100%, 60%)`;
	};

	const getColorMap = (keys, fixedMap = {}) => {
		console.log(fixedMap)
  		const colorMap = { ...fixedMap };
			keys.forEach(k => {
				if (!colorMap[k]) {
					colorMap[k] = getRandomColor();
				}
			});
		console.log(colorMap)
  		return colorMap;
	};

	const chartData = generateChartData(traficLogs, barchartNetworkType);
	const dynamicKeys = chartData.length > 0 ? Object.keys(chartData[0]).filter(k => k !== "name") : [];

	const colorMap = barchartNetworkType === "num_proto"
  		? getColorMap(dynamicKeys, protocolColorMap)  // фиксированные
  		: getColorMap(dynamicKeys);    


  	return (
		<div className="dashboard-network">
			<div className="barchart-network">
				<div className="barchart-network-config">
					<div className="barchart-network-config-item">
						<label className="network-config-item-label" htmlFor="interval">type:</label>
				  		<select
							id="interval"
							value={barchartNetworkType}
							className="network-config-item-select"
							onChange={(e) => setBarchartNetworkType(e.target.value)}
				  		>
							<option value="num_proto">Protocols</option>
							<option value="ips_src">Source IPs</option>
							<option value="ips_dst">Destination IPs</option>
							<option value="macs_src">Source MACs</option>
							<option value="macs_dst">Destination MACs</option>
				 		</select>
					</div>


					<div className="barchart-network-config-item">
						<label className="network-config-item-label" htmlFor="type">type:</label>
				  		<select
							id="type"
							value={barchartNetworkType}
							className="network-config-item-select"
							onChange={(e) => setBarchartNetworkType(e.target.value)}
				  		>
							<option value="num_proto">Protocols</option>
							<option value="ips_src">Source IPs</option>
							<option value="ips_dst">Destination IPs</option>
							<option value="macs_src">Source MACs</option>
							<option value="macs_dst">Destination MACs</option>
				 		</select>
					</div>
				</div>
				<BarChart width={1100} height={400} data={chartData} barSize={12}>
					<XAxis dataKey="name" />
					<YAxis />
					<Legend />
					<Tooltip
		  				cursor={false}
		  				content={<CustomTooltip />}
					/>

					{dynamicKeys.map((key, idx) => (
						<Bar
							key={key}
							dataKey={key}
							stackId="a"
							fill={colorMap[key]}
							radius={[4, 4, 0, 0]}
					  	/>
					))}


				</BarChart>
			</div>
		</div>
  );
}
