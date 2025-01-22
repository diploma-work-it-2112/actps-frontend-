import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export default function LoadingSystem(){
	
	const [memoryData, setMemoryData] = useState({
    labels: [],
    datasets: [
      { label: 'Total Memory', data: [], borderColor: 'blue', tension: 0.4 },
      { label: 'Used Memory', data: [], borderColor: 'green', tension: 0.4 },
      { label: 'Swap Used', data: [], borderColor: 'red', tension: 0.4 },
    ],
  });

  const [cpuData, setCpuData] = useState({
    labels: [],
    datasets: [
      { label: 'CPU Core 1', data: [], borderColor: 'orange', tension: 0.4 },
      { label: 'CPU Core 2', data: [], borderColor: 'purple', tension: 0.4 },
      { label: 'CPU Core 3', data: [], borderColor: 'teal', tension: 0.4 },
      { label: 'CPU Core 4', data: [], borderColor: 'brown', tension: 0.4 },
    ],
  });

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8000/v1/ws/system_load');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMemoryData((prev) => ({
        ...prev,
        labels: [...prev.labels, new Date().toLocaleTimeString()].slice(-10),
        datasets: [
          {
            ...prev.datasets[0],
            data: [...prev.datasets[0].data, data.memory.total].slice(-10),
          },
          {
            ...prev.datasets[1],
            data: [...prev.datasets[1].data, data.memory.used].slice(-10),
          },
          {
            ...prev.datasets[2],
            data: [...prev.datasets[2].data, data.memory.swap[1]].slice(-10),
          },
        ],
      }));

      setCpuData((prev) => ({
        ...prev,
        labels: [...prev.labels, new Date().toLocaleTimeString()].slice(-10),
        datasets: data.cpu.map((usage, index) => ({
          ...prev.datasets[index],
          data: [...prev.datasets[index].data, usage].slice(-10),
        })),
      }));
    };

    return () => {
      ws.close();
    };
  }, []);

	return(
		<div className="loading-system-content">
      <div style={{ width: '600px', margin: '0 auto' }}>
        <h2 style={{color: '#FFFFFF'}}>Memory Usage</h2>
        <Line data={memoryData} />
      </div>
      <div style={{ width: '600px', margin: '0 auto', marginTop: '20px' }}>
        <h2 style={{color: '#FFFFFF'}}>CPU Usage</h2>
        <Line data={cpuData} />
      </div>
		</div>
	)
}
