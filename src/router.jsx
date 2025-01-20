import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/main_page";

export default function Router(){
    return(
        <Routes>
        	<Route path="/" element={<MainPage />} /> 
        </Routes>
    )
}    
