import React, { useState } from "react";
import api from "../api";
import ReactJson from "react-json-view";

const DirectoryNavigator = ({ rootNode }) => {
  	const [currentNode, setCurrentNode] = useState(rootNode);
  	const [history, setHistory] = useState([]);
	const [jsonContent, setJsonContent] = useState(null);
	const [selectedFileName, setSelectedFileName] = useState("");

  const enterDirectory = (childNode) => {
    setHistory((prev) => [...prev, currentNode]);
    setCurrentNode(childNode);
	  setJsonContent(null);
  };

  const goBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const previousNode = newHistory.pop();
      setHistory(newHistory);
      setCurrentNode(previousNode);
		setJsonContent(null);
    }
  };

	 const handleFileClick = async (fileNode) => {
    try {
      setSelectedFileName(fileNode.name);

      const response = await api.get(`/log/process/${fileNode.name}`);

      setJsonContent(response.data["report"]);
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
    }
  };

  return (
    <div className="folder-content">
      <h4>Текущая папка: {currentNode.name}</h4>
      <button className="folder-back" onClick={goBack} disabled={history.length === 0}>
        ⬅ Назад
      </button>

	  <div className="folder-elemts">
			{currentNode.children.map((child, index) => (
          <li key={index} style={{ cursor: child.isDirectory() ? "pointer" : "default" }}>
            {child.isDirectory() ? (
              <span onClick={() => enterDirectory(child)}>📁 {child.name}</span>
            ) : (
              <span onClick={() => handleFileClick(child)}>📄 {child.name}</span>
            )}
          </li>
        ))}	
	  </div>


	  {jsonContent && (
        <div style={{ marginTop: "20px" }}>
          <h5>📄 Содержимое файла: {selectedFileName}</h5>
          <ReactJson
            src={jsonContent}
            theme="monokai"
            collapsed={1}
            enableClipboard={true}
            displayDataTypes={false}
          />
        </div>
      )}

    </div>
  );
};

export default DirectoryNavigator;

