import { useEffect, useState, useRef } from "react";


export default function ListTraficComponent({ipParam, protoParam}){
	const [trafic2render, setTrafic2render] = useState([])	
	const [traficResponse, setTraficResponse] = useState([])

	const uppedToStartTrafic2redner = (elem) => {
		let res = trafic2render
		let elem_to_append = elem
		let next_elem = elem
		for(var i=0; i<trafic2render.length+1; i++){
			if(i == 1000){
				break
			}
			elem_to_append = next_elem
			next_elem = res[i]
			res[i] = elem_to_append
		}
		return res
	}

	const ws = useRef(null);

  const connectionIdRef = useRef(0);

  const startWebSocket = () => {
    // Инкрементируем идентификатор подключения
    connectionIdRef.current += 1;
    const currentConnId = connectionIdRef.current;

    if (ws.current) return;

    ws.current = new WebSocket(`ws://127.0.0.1:8000/v1/ws/trafic/?ip=${ipParam}&protocol=${protoParam}`);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      // Если сообщение пришло не от текущей сессии, его пропускаем
      if (currentConnId !== connectionIdRef.current) return;
      try {
        const data = JSON.parse(event.data);
        // Если данные приходят очень часто, можно добавить троттлинг или группировку обновлений
        setTrafic2render((prevArray) => [data, ...prevArray].slice(0, 100));
        console.log("Updated array length:", trafic2render.length);
      } catch (error) {
        console.log("Error parsing message data", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      ws.current = null;
    };
  };

  const stopWebSocket = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  };
	 useEffect(() => {
    stopWebSocket();
    startWebSocket();

    // Очистка при размонтировании компонента
    return () => {
      stopWebSocket();
    };
  }, [ipParam, protoParam]);
	

	const protocolColors = {
  ethertype: {
    "0x0800": "#C14C4C", // IPv4 (было #F27979)
    "0x86DD": "#4BB9A7", // IPv6 (было #79F2DD)
    "0x0806": "#C19751"  // ARP (было #F2BA79)
  },
  transport: {
    TCP: "#4A69C9",    // TCP (было #799CF2)
    UDP: "#8CBF55",    // UDP (было #BFF279)
    ICMP: "#C14AAE",   // ICMP (было #F279E3)
    DNS: "#6B57C9",    // DNS (было #9779F2)
    HTTP: "#8899AA",   // HTTP (было #AABBCC)
    HTTPS: "#AABBDD"   // HTTPS (было #CCDDEE)
  }
};

	// Функция для определения протокола пакета по наличию ключевых полей
	function getProtocolInfo(packet) {
	  // Если в пакете есть поле http_payload – считаем протокол HTTP
	  if (packet.http_payload) {
		return { label: "HTTP", color: protocolColors.transport.HTTP || "#AAAAAA" };
	  }
	  // Если есть поле https_payload_hex – HTTPS
	  if (packet.https_payload_hex) {
		return { label: "HTTPS", color: protocolColors.transport.HTTPS || "#AAAAAA" };
	  }
	  if (packet.tcp_payload) {
		return { label: "TCP", color: protocolColors.transport.TCP };
	  }
	  if (packet.udp_payload) {
		return { label: "UDP", color: protocolColors.transport.UDP };
	  }
	  if (packet.icmp_type !== undefined) {
		return { label: "ICMP", color: protocolColors.transport.ICMP };
	  }
	  if (packet.ipv6_src) {
		return { label: "IPv6", color: protocolColors.ethertype["0x86DD"] };
	  }
	  if (packet.arp_hwsrc) {
		return { label: "ARP", color: protocolColors.ethertype["0x0806"] };
	  }
	  if (packet.dns_id !== undefined) {
		return { label: "DNS", color: protocolColors.transport.DNS };
	  }
	  return { label: "Unknown", color: "#FFFFFF" };
	}

	// Компонент, который отображает один пакет
	function PacketItem({ packet }) {
	  const protocolInfo = getProtocolInfo(packet);
	  // Преобразуем поле time (ожидаем timestamp в секундах) в читаемую дату
	  const date = new Date(parseFloat(packet.time) * 1000).toLocaleString();
		console.log(date)
	  return (
		<div
		  className="trafic-packet"
		  style={{
			backgroundColor: protocolInfo.color,
		  }}
		>
		  <p className="trafic-packet-time"><strong>Time:</strong> {date}</p>
		  <p className="trafic-packet-source">
			{packet.ip_src || packet.ipv6_src || packet.arp_psrc || "-"}
		  </p>
		  <p className="trafic-packet-destination">
			{packet.ip_dst || packet.ipv6_dst || packet.arp_pdst || "-"}
		  </p>
		  <p className="trafic-packet-protocol">
			{protocolInfo.label}
		  </p>
		  <p className="trafic-packet-length">
			{packet.tcp_payload
			  ? packet.tcp_payload.length
			  : packet.udp_payload
			  ? packet.udp_payload.length
			  : "-"}
		  </p>
		  <p className="trafic-packet-info">
			{packet.http_request_line ||
			  (packet.https_payload_hex && "HTTPS Data") ||
			  "-"}
		  </p>
		</div>
	  );
	}

	return(
		<>
		<div className="trafic-container">
		<div className="trafic-actives">
			<div className="trafic-active-button">
				<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 5V3C1 2.46957 1.22242 1.96086 1.61833 1.58579C2.01424 1.21071 2.55121 1 3.11111 1H5.22222M15.7778 1H17.8889C18.4488 1 18.9858 1.21071 19.3817 1.58579C19.7776 1.96086 20 2.46957 20 3V5M20 15V17C20 17.5304 19.7776 18.0391 19.3817 18.4142C18.9858 18.7893 18.4488 19 17.8889 19H15.7778M5.22222 19H3.11111C2.55121 19 2.01424 18.7893 1.61833 18.4142C1.22242 18.0391 1 17.5304 1 17V15" fill="#00B9F4"/>
<path d="M1 5V3C1 2.46957 1.22242 1.96086 1.61833 1.58579C2.01424 1.21071 2.55121 1 3.11111 1H5.22222M15.7778 1H17.8889C18.4488 1 18.9858 1.21071 19.3817 1.58579C19.7776 1.96086 20 2.46957 20 3V5M20 15V17C20 17.5304 19.7776 18.0391 19.3817 18.4142C18.9858 18.7893 18.4488 19 17.8889 19H15.7778M5.22222 19H3.11111C2.55121 19 2.01424 18.7893 1.61833 18.4142C1.22242 18.0391 1 17.5304 1 17V15" stroke="#00B9F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

				<p className="trafic-active-button-p">SCAN</p>
			</div>

			<div className="trafic-active-button" onClick={stopWebSocket}>
<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.47827 1H4.4348C4.73145 1 4.91307 1.22384 4.91307 1.42857V18.5714C4.91307 18.7762 4.73145 19 4.4348 19H1.47827C1.18162 19 1 18.7762 1 18.5714V1.42857C1 1.22384 1.18162 1 1.47827 1ZM4.4348 0H1.47827C0.661843 0 0 0.639593 0 1.42857V18.5714C0 19.3604 0.661843 20 1.47827 20H4.4348C5.25123 20 5.91307 19.3604 5.91307 18.5714V1.42857C5.91307 0.639593 5.25123 0 4.4348 0ZM12.5651 1H15.5216C15.8183 1 15.9999 1.22384 15.9999 1.42857V18.5714C15.9999 18.7762 15.8183 19 15.5216 19H12.5651C12.2684 19 12.0868 18.7762 12.0868 18.5714V1.42857C12.0868 1.22384 12.2684 1 12.5651 1ZM15.5216 0H12.5651C11.7487 0 11.0868 0.639593 11.0868 1.42857V18.5714C11.0868 19.3604 11.7487 20 12.5651 20H15.5216C16.338 20 16.9999 19.3604 16.9999 18.5714V1.42857C16.9999 0.639593 16.338 0 15.5216 0Z" fill="#00B9F4"/>
</svg>

				<p className="trafic-active-button-p">STOP</p>
			</div>

			<div className="trafic-active-button" onClick={startWebSocket}>
	<svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.02352 0.295505L11.7813 8.60592C11.9123 8.71735 12.0173 8.85478 12.0892 9.00897C12.1612 9.16316 12.1984 9.33054 12.1984 9.49989C12.1984 9.66923 12.1612 9.83662 12.0892 9.99081C12.0173 10.145 11.9123 10.2824 11.7813 10.3939L2.02352 18.7043C1.23436 19.375 0 18.8313 0 17.8103V1.18947C0 0.169662 1.23436 -0.375264 2.02352 0.295505ZM11.1329 9.36723L1.37588 1.05745L1.37566 1.05727C1.30207 0.994844 1.21197 0.982583 1.11984 1.02327C1.07406 1.04349 1.04322 1.0717 1.02602 1.09641C1.0119 1.1167 1 1.14344 1 1.18947V17.8103C1 17.8569 1.01205 17.8838 1.0261 17.904C1.04324 17.9286 1.07394 17.9567 1.11956 17.9768C1.21127 18.0173 1.3015 18.0053 1.37541 17.9427L1.37588 17.9423L11.1329 9.63254L11.1334 9.63212C11.1562 9.61275 11.1725 9.5905 11.183 9.56797C11.1935 9.54553 11.1984 9.52241 11.1984 9.49989C11.1984 9.47736 11.1935 9.45424 11.183 9.4318C11.1725 9.40927 11.1562 9.38703 11.1334 9.36765L11.1329 9.36723ZM25.935 9.63212L25.9345 9.63254L16.1775 17.9423C16.1035 18.0052 16.0131 18.0174 15.9212 17.9768C15.8755 17.9567 15.8448 17.9286 15.8277 17.904C15.8136 17.8838 15.8016 17.8569 15.8016 17.8103V1.18947C15.8016 1.14344 15.8135 1.1167 15.8276 1.09641C15.8448 1.0717 15.8757 1.04349 15.9214 1.02327C16.0136 0.982588 16.1036 0.994841 16.1772 1.05724L16.1775 1.05745L25.9345 9.36723L25.935 9.36765C25.9578 9.38703 25.9741 9.40927 25.9846 9.4318C25.9951 9.45424 26 9.47736 26 9.49989C26 9.52241 25.9951 9.54553 25.9846 9.56797C25.9741 9.5905 25.9578 9.61274 25.935 9.63212ZM14.8016 1.18947V17.8103C14.8016 18.8313 16.036 19.375 16.8251 18.7043L26.5829 10.3939C26.7139 10.2824 26.8189 10.145 26.8908 9.99081C26.9628 9.83662 27 9.66923 27 9.49989C27 9.33054 26.9628 9.16315 26.8908 9.00897C26.8189 8.85478 26.7139 8.71735 26.5829 8.60592L16.8251 0.295505C16.036 -0.375264 14.8016 0.169662 14.8016 1.18947Z" fill="#00B9F4"/>
</svg>

				<p className="trafic-active-button-p">TRACK</p>
			</div>
		</div>
		<div className="trafic-packets-block">	
			<div className="trafic-packet">
				<p className="trafic-packet-time">Time</p>
				<p className="trafic-packet-source">Source</p>
				<p className="trafic-packet-destination">Destination</p>
				<p className="trafic-packet-protocol">Protocol</p>
				<p className="trafic-packet-length">Length</p>
				<p className="trafic-packet-info">Info</p>
			</div>

			{trafic2render && trafic2render.map((item, index) => {
  if (item !== undefined) {
    return <PacketItem key={index} packet={item} />;
  }
  return null;
})}
		</div>
		</div>
		</>
	)
}
