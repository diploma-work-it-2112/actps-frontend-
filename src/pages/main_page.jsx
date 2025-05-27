import React, { useState, useEffect, useRef } from "react";
import Router from "../Entities/classRouter";
import PC from "../Entities/classPC";
import ConnectionTree from "../components/connection_tree";
import LeftNavBar from "../components/navbar";
import DeviceGroupBlock from "../components/device_group_block";

export default function MainPage() {
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

  	return (
    	<div style={{ display: "flex" }}>
      		<LeftNavBar
        		routers={selectedItems}
        		onScan={(scannedItems) => {
          			console.log("Scanned Items:", scannedItems);
          			setSelectedItems(scannedItems); 
        		}}
      		/>
      		<ConnectionTree
        		routers={selectedItems}
        		pcs={selectedItems.flatMap((router) => router.computers)} 
	  			selectedItems={selectedItems}
	    		setSelectedItems={setSelectedItems}
      		/>

			<DeviceGroupBlock routers={allItems}/>
    	</div>
  	);
}
