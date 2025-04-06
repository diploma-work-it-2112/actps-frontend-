class PC {
	constructor({ id, ip_address, hostname, router_id, created_at, color = "#FFFFFF", checked = false, opacity = 1 }) {
		this.id = id;
		this.ip_address = ip_address;
		this.hostname = hostname;
		this.router_id = router_id;
		this.created_at = new Date(created_at);
		this.color = color;
		this.checked = checked;
		this.opacity = opacity;
		this.is_work = false;
	}


	updateIpAddress(newIpAddress) {
		this.ip_address = newIpAddress;
	}
}

export default PC;
