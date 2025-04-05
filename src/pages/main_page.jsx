import React, { useState, useEffect } from "react";
import Router from "../Entities/classRouter";
import PC from "../Entities/classPC";
import ConnectionTree from "../components/connection_tree";
import LeftNavBar from "../components/navbar";

export default function MainPage() {
  const [allItems, setAllItems] = useState([]); // Все роутеры
  const [selectedItems, setSelectedItems] = useState([]); // Отфильтрованные/выбранные роутеры
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
		const response = await fetch("http://127.0.0.1:8000/v1/router");
		const jsonData = await response.json()
      // Преобразуем JSON в объекты класса Router
      const routers = jsonData.map((routerData) => new Router(routerData));

      setAllItems(routers);
      setSelectedItems(routers);
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <LeftNavBar
        routers={selectedItems}
        onScan={(scannedItems) => {
          console.log("Scanned Items:", scannedItems);
          setSelectedItems(scannedItems); // Обновляем выбранные маршрутизаторы
        }}
      />
      <ConnectionTree
        routers={selectedItems}
        pcs={selectedItems.flatMap((router) => router.computers)} // ПК из всех выбранных маршрутизаторов
      />
    </div>
  );
}
