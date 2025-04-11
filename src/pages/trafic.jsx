import { useEffect, useState } from "react";
import ListTraficComponent from "../components/lift_trafic";
import LeftNavBar from "../components/navbar";
import TraficLeftNavBar from "../components/trafic_navbar";
import Router from "../Entities/classRouter";
import { useSearchParams } from "react-router-dom";

export default function TraficPage(){
	 const [searchParams, setSearchParams] = useSearchParams();

  // Инициализируем состояния из параметров или задаем значение "all"
	  const [iPparams, setIpParams] = useState(() => searchParams.get("ip") || "all");
	  const [protoParams, setProtoParams] = useState(() => searchParams.get("proto") || "all");



	const [allItems, setAllItems] = useState([]); 
	const [selectedItems, setSelectedItems] = useState([]); 
	const [loading, setLoading] = useState(true);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

	useEffect(() => {
    	const fetchData = async () => {
      		try {
        		const response = await fetch("http://127.0.0.1:8000/v1/router");
        		const jsonData = await response.json();

        		if (jsonData && jsonData.length > 0) {
          			const routers = jsonData.map((routerData) => new Router(routerData));
         	 		setAllItems(routers);
          			setSelectedItems(routers);
        		} else {
          			console.warn("Получен пустой список роутеров");
        		}
      		} catch (error) {
        		console.error("Ошибка при загрузке данных", error);
      		} finally {
        		setLoading(false);
      		}
    	};

    	fetchData();
  	}, []);

	if (loading) {
    	return <div>Загрузка...</div>;
  	}


	return(
		<div style={{display: "flex"}}>
			<TraficLeftNavBar pcs={selectedItems.flatMap((router) => router.computers)} ipParams={iPparams} protoParams={protoParams} setIpParams={setIpParams} setProtoParams={setProtoParams}/>
			<ListTraficComponent ipParam={iPparams} protoParam={protoParams}/>
		</div>
	)
}
