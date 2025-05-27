import { useMemo, useState } from 'react';
import {
	BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Pie, PieChart
} from 'recharts';


export default function NetworkOverviewComponent({traficLogs}){
	console.log(traficLogs)

	const [barchartNetworkType, setBarchartNetworkType] = useState("num_proto")

	const protocolColorMap = {
		Ether: '#39ff14',
  		IPv4: '#00ffff',
  		TCP: '#ff1493',
  		UDP: '#ff9933',
  		ICMP: '#fefe33',
  		IPv6: '#8a2be2',
  		ARP: '#00ffcc',
  		DNS: '#ff6ec7',
  		HTTP: '#da70d6',
  		HTTPS: '#1e90ff',
  		Unknown: '#bbbbbb',
	};




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
	
	const chartData = useMemo(() => {
		return generateChartData(traficLogs, barchartNetworkType);
	}, [traficLogs, barchartNetworkType]);
	
	const dynamicKeys = useMemo(() => {
  		return chartData.length > 0
    		? Object.keys(chartData[0]).filter(k => k !== "name")
    		: [];
	}, [chartData]);

	const colorMap = barchartNetworkType === "num_proto"
  		? getColorMap(dynamicKeys, protocolColorMap)  // фиксированные
  		: getColorMap(dynamicKeys);    




	const aggregateGroupData = (logs, groupKey, limit = 10) => {
  		const total = {};

  		logs.forEach(log => {
    		const group = log[groupKey];
    		if (!group) return;

    		for (const [key, value] of Object.entries(group)) {
      			total[key] = (total[key] || 0) + value;
    		}
  		});

  		const sorted = Object.entries(total)
    		.map(([name, value]) => ({ name, value }))
    		.sort((a, b) => b.value - a.value)  

		return sorted.slice(0, limit); 
	};

	const getAllKeysFromLogs = (logs, type) => {
  const allKeys = new Set();
  logs.forEach(log => {
    const group = log[type] || {};
    Object.keys(group).forEach(k => allKeys.add(k));
  });
  return Array.from(allKeys);
};


	const protoData = aggregateGroupData(traficLogs, "num_proto", 10);
	const ipsSrcData = aggregateGroupData(traficLogs, "ips_src", 10);
	const ipsDstData = aggregateGroupData(traficLogs, "ips_dst", 10);
	const macsSrcData = aggregateGroupData(traficLogs, "macs_src", 10);
	const macsDstData = aggregateGroupData(traficLogs, "macs_dst", 10);

const allKeysIpSrc = getAllKeysFromLogs(traficLogs, "ips_src");
const allKeysIpDst = getAllKeysFromLogs(traficLogs, "ips_dst");
const allKeysMacsSrc = getAllKeysFromLogs(traficLogs, "macs_src");
const allKeysMacsDst = getAllKeysFromLogs(traficLogs, "macs_dst");

	const PieChartComponent = ({ data, colorMap }) => (
  		<PieChart width={300} height={300}>
    		<Pie
      			data={data}
      			dataKey="value"
			  	nameKey="name"
			  	cx="50%"
			  	cy="50%"
			  	outerRadius={100}
			  	label
			>
    	{data.map((entry, index) => (
        	<Cell key={`cell-${index}`} fill={colorMap?.[entry.name] || getRandomColor()} />
      	))}
    	</Pie>
    	<Tooltip />
		<Legend/>
  		</PieChart>
	);

	const colorMapProto = getColorMap(dynamicKeys, protocolColorMap);
const colorMapIpSrc = getColorMap(allKeysIpSrc);
const colorMapIpDst = getColorMap(allKeysIpDst);
const colorMapMacsSrc = getColorMap(allKeysMacsSrc);
const colorMapMacsDst = getColorMap(allKeysMacsDst);

	const activeColorMap = useMemo(() => {
  		switch (barchartNetworkType) {
    		case "num_proto": return getColorMap(dynamicKeys, protocolColorMap);
    		case "ips_src": return colorMapIpSrc;
    		case "ips_dst": return colorMapIpDst;
    		case "macs_src": return colorMapMacsSrc;
    		case "macs_dst": return colorMapMacsDst;
    	default: return {};
  		}
	}, [barchartNetworkType, dynamicKeys]);


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
							fill={activeColorMap[key]}
							radius={[4, 4, 0, 0]}
					  	/>
					))}


				</BarChart>

				<div className="pie-charts-container">
  <div className="pie-charts-group">
    <div className="pie-chart-box">
      <h4>Protocols</h4>
      <PieChartComponent data={protoData} colorMap={colorMapProto} />
    </div>
  </div>

  <div className="pie-charts-group">
    <div className="pie-chart-box">
      <h4>IP Src</h4>
      <PieChartComponent data={ipsSrcData} colorMap={colorMapIpSrc} />
    </div>
    <div className="pie-chart-box">
      <h4>IP Dst</h4>
      <PieChartComponent data={ipsDstData} colorMap={colorMapIpDst} />
    </div>
  </div>

  <div className="pie-charts-group">
    <div className="pie-chart-box">
      <h4>MAC Src</h4>
      <PieChartComponent data={macsSrcData} colorMap={colorMapMacsSrc} />
    </div>
    <div className="pie-chart-box">
      <h4>MAC Dst</h4>
      <PieChartComponent data={macsDstData} colorMap={colorMapMacsDst} />
    </div>
  </div>
</div>

			</div>
		</div>
  );
}
