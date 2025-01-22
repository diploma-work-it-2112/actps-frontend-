// class PC {
//   constructor(id, name, color, opacity = 1, routerId, checked = false) {
//     this.id = id;
//     this.name = name;
//     this.color = color;
//     this.opacity = opacity;
//     this.routerId = routerId;
//     this.checked = checked;
//   }
// }

// export default PC;

////////////////////////////////tewst
// class PC {
//   constructor(id, ip_address, hostname, router_id = null, created_at, color = "#FFFFFF", checked = false, opacity = 1) {
//     this.id = id;
//     this.ip_address = ip_address;
//     this.hostname = hostname;
//     this.router_id = router_id;
//     this.created_at = new Date(created_at);
//     this.color = color;
//     this.checked = checked;
//     this.opacity = opacity;
//   }
// }

// export default PC;

////////////////////////////////////////
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
  }
}

export default PC;
