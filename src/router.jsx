import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/main_page";
import SystemMonitor from "./pages/system_monitor";
import ListTraficComponent from "./components/lift_trafic";
import TraficPage from "./pages/trafic";

export default function Router(){
    return(
        <Routes>
        	<Route path="/" element={<MainPage />} /> 
			<Route path="/monitoring-system/:hostname/:ip_address" element={<SystemMonitor />}/>
			<Route path="/trafic" element={<TraficPage/>} />
        </Routes>
    )
}    
