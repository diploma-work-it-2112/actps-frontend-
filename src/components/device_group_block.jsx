export default function DeviceGroupBlock({routers}){
	return (
		<div className="device-group-container">
			{routers.map((router) => (
				<div className="device-group-block">
					<div className="d-group-color" style={{backgroundColor: router.color}}/>
					<p className="d-group-hostname">{router.hostname}</p>
					<p className="d-group-groupname">{router.group_name ? router.group_name : "null"}</p>
					<svg
					  xmlns="http://www.w3.org/2000/svg"
					  height="16"
					  width="16"
					  viewBox="0 0 24 24"
					  fill="currentColor"
					>
					  <path d="M0 0h24v24H0V0z" fill="none" />
					  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18.37-10.37c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
					</svg>

				</div>
			))}
		</div>
	)
}
