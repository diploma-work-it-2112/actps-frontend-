import React, { useState, useEffect } from "react";
import Router from "../Entities/classRouter";
import PC from "../Entities/classPC";
import ConnectionTree from "../components/connection_tree";
import LeftNavBar from "../components/navbar";

export default function MainPage() {
  const [allItems, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          name: "Router1",
          color: "#00FF00",
          // opacity: 1,
          pcs: [
            { id: 1, name: "PC1", color: "#00FF00", routerId: 1 },
            { id: 2, name: "PC2", color: "#00FF00", routerId: 1 },
          ],
        },
        {
          id: 2,
          name: "Router2",
          color: "#FF0000",
          // opacity: 1,
          pcs: [{ id: 3, name: "PC1", color: "#FF0000", routerId: 2 }],
        },
        {
          id: 3,
          name: "Router3",
          color: "#0000FF",
          // opacity: 1,
          pcs: [{ id: 4, name: "PC1", color: "#0000FF", routerId: 3 }],
        },
      ];

      setAllItems(data);
      setSelectedItems(data);
    };

    fetchData();
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <LeftNavBar
        routers={selectedItems}
        //  onScan={(selected) => {
        //   console.log("Scanned Items:", selected);
        //   setSelectedItems(selected)}}
        onScan={(selected) => {
          console.log("Scanned Items:", selected);

          // Preserve existing checked states
          const updatedSelectedItems = allItems.map((item) => {
            const selectedItem = selected.find((sel) => sel.id === item.id);
            return selectedItem || item;
          });

          setSelectedItems(updatedSelectedItems);
        }}
      />
      <ConnectionTree
        routers={selectedItems}
        pcs={selectedItems.flatMap((router) => router.pcs)}
      />
    </div>
  );
}
