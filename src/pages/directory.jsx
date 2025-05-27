import { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import DirectoryNode from "../Entities/directoryNode";
import DirectoryNavigator from "../components/directoryNavigator";

export default function DirectoryDevice(){
	
	const {ip_address} = useParams()
	const [treeRoot, setTreeRoot] = useState(null);

	function parseDirectoryTree(json) {
		return new DirectoryNode(json.name, json.type, json.children || []);
	}

	useEffect(() => {
		const fetchData = async () => {
			try{
				const response = await api.get(`pc/tree/${ip_address}`)
				const json_response = response.data 

				const rootNode = parseDirectoryTree(json_response);
				console.log(rootNode)
				setTreeRoot(rootNode);

			}catch (error){
				console.log(error)
			}
		}

		fetchData()
	},[])


	return(
		<>
		<div className="directory-content">
			<h2>Файловая структура устройства {ip_address}</h2>
			{treeRoot ? <DirectoryNavigator rootNode={treeRoot} /> : <p>Загрузка...</p>}
		</div>	
		</>
	)
}
