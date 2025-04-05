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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:8000"); // 👈 Проверь URL!

  //       if (!response.ok) {
  //         throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  //       }

  //       const jsonData = await response.json();
  //       console.log("Ответ от сервера:", jsonData); // 👀 Проверяем, что приходит

  //       // ✅ Проверяем, является ли jsonData массивом
  //       if (Array.isArray(jsonData)) {
  //         // Если это массив, обрабатываем как массив
  //         const routers = jsonData.map((routerData) => new Router(routerData));
  //         setAllItems(routers);
  //         setSelectedItems(routers);
  //       } else if (jsonData.routers && Array.isArray(jsonData.routers)) {
  //         // Если backend возвращает { "routers": [...] }, берём jsonData.routers
  //         const routers = jsonData.routers.map((routerData) => new Router(routerData));
  //         setAllItems(routers);
  //         setSelectedItems(routers);
  //       } else {
  //         throw new Error("Ошибка: Backend не вернул массив данных");
  //       }

  //     } catch (err) {
  //       console.error("Ошибка загрузки данных:", err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
{/* <div style={{ display: "flex" }}>
      {loading && <p>Загрузка данных...</p>}
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

      {!loading && !error && (
        <>
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
          />
        </>
      )}
    </div>
  );
} */}
