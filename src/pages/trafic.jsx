import ListTraficComponent from "../components/lift_trafic";
import LeftNavBar from "../components/navbar";
import TraficLeftNavBar from "../components/trafic_navbar";

export default function TraficPage(){
	return(
		<div style={{display: "flex"}}>
			<TraficLeftNavBar/>
			<ListTraficComponent />
		</div>
	)
}
