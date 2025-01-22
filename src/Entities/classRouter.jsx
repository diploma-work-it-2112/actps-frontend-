// import PC from "./classPC";
// class Router {
//   constructor(id, name, color, opacity = 1, pcs = [], checked = false) {
//     this.id = id;
//     this.name = name;
//     this.color = color;
//     this.opacity = opacity;
//     this.pcs = pcs.map(
//       (pc) => new PC(pc.id, pc.name, pc.color, pc.opacity, id, pc.checked)
//     );
//     this.checked = checked;
//   }
// }

// export default Router;
///////////////////////////////////////////////////
// import PC from "./classPC";

// class Router {
//   constructor(id, model_name, color, ip_address, hostname, created_at, pcs = [], checked = false, opacity = 1) {
//     this.id = id;
//     this.model_name = model_name;
//     this.color = color;
//     this.ip_address = ip_address;
//     this.hostname = hostname;
//     this.created_at = new Date(created_at);
//     this.computers = pcs.map(
//       (pc) => new PC(pc.id, pc.ip_address, pc.hostname, pc.router_id, pc.created_at, pc.color, pc.checked, pc.opacity || 1)
//     );
//     this.checked = checked;
//     this.opacity = opacity;
//   }
// }

// export default Router;
// import PC from "./classPC";

// function getRandomColor() {
//   const colors = [
//     '#0000FF',
//     '#FF0000',
//     '#00FF00',
//     '#00FFFF',
//     '#808000',
//     '#008B8B',
//   ];
//   return colors[Math.floor(Math.random() * colors.length)];
// }

// class Router {
//   constructor(id, model_name, ip_address, hostname, created_at, pcs = [], checked = false, opacity = 1) {
//     this.id = id;
//     this.model_name = model_name;
//     // Generate a random color for the router
//     this.color = getRandomColor();
//     this.ip_address = ip_address;
//     this.hostname = hostname;
//     this.created_at = new Date(created_at);
    
//     // Create PC instances with the router's color to ensure color consistency
//     this.computers = pcs.map(
//       (pc) => new PC(
//         pc.id, 
//         pc.ip_address, 
//         pc.hostname, 
//         pc.router_id || this.id, // Assuming each PC should link back to this router if not specified
//         pc.created_at, 
//         this.color, // Use router's color for PC
//         pc.checked, 
//         pc.opacity || 1
//       )
//     );
//     this.checked = checked;
//     this.opacity = opacity;
//   }
// }

// export default Router;

/////////////////////////////////////////gfdgf////////////
import PC from "./classPC";
let usedColors = [];

function getRandomColor() {
  const colors = ["#0000FF", "#FF0000", "#00FF00", "#00FFFF", "#808000", "#008B8B"];
  const availableColors = colors.filter((color) => !usedColors.includes(color));

  if (availableColors.length === 0) {
    usedColors = []; // Сброс использованных цветов, если все уже были использованы
  }

  const color = availableColors[Math.floor(Math.random() * availableColors.length)];
  usedColors.push(color); // Добавляем цвет в список использованных
  return color;
}

class Router {
  constructor({ id, model_name, ip_address, hostname, created_at, pcs = [], checked = false, opacity = 1 }) {
    this.id = id;
    this.model_name = model_name;
    this.color = getRandomColor();
    this.ip_address = ip_address;
    this.hostname = hostname;
    this.created_at = new Date(created_at);
    this.checked = checked;
    this.opacity = opacity;
    this.computers = pcs.map(
      (pc) => new PC({ ...pc, color: this.color }) // Привязываем цвет маршрутизатора к ПК
    );
  }
}

export default Router;


