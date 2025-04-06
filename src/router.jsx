import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/main_page";
import SystemMonitor from "./pages/system_monitor";

export default function Router(){
    return(
        <Routes>
        	<Route path="/" element={<MainPage />} /> 
			<Route path="/monitoring-system/:hostname/:ip_address" element={<SystemMonitor />}/>
        </Routes>
    )
}    
