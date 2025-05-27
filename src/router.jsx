import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/main_page";
import SystemMonitor from "./pages/system_monitor";
import ListTraficComponent from "./components/lift_trafic";
import TraficPage from "./pages/trafic";
import DirectoryDevice from "./pages/directory";
import DashboardPage from "./pages/dashboard";

export default function Router(){
    return(
        <Routes>
        	<Route path="/" element={<MainPage />} /> 
			<Route path="/monitoring-system/:hostname/:ip_address" element={<SystemMonitor />}/>
			<Route path="/trafic" element={<TraficPage/>} />
			<Route path="/folder-tree/:ip_address" element={<DirectoryDevice />} />
			<Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
    )
}    
