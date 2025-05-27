import {
	BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';


export default function NetworkOverviewComponent({traficLogs}){
	console.log(traficLogs)

	const neonColors = [
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


	const chartData = traficLogs.map((log, index) => ({
    	name: new Date(log.time * 1000).toLocaleTimeString(),  // или `index`
    	...log.num_proto,
  	}));

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


  	return (
		<div className="dashboard-network">
			<div className="barchart-network">
				<div className="barchart-network-config">
					
				</div>
				<BarChart width={1100} height={400} data={chartData} barSize={12}>
					<XAxis dataKey="name" />
					<YAxis />
					<Legend />
					<Tooltip
		  				cursor={false}
		  				content={<CustomTooltip />}
					/>

					{protocols.map((proto, idx) => (
						<Bar
							key={proto}
							dataKey={proto}
							stackId="a"
							fill={neonColors[idx % neonColors.length]}
						 	radius={[4, 4, 0, 0]}
						/>
					))}
				</BarChart>
			</div>
		</div>
  );
}
