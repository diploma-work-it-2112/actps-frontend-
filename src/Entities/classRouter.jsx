import PC from "./classPC";
let usedColors = [];

function getRandomColor() {
  const colors = ["#800000", "#00FF00", "#FF4500", "#FFFF00", "#000080", "#9ACD32"];
  const availableColors = colors.filter((color) => !usedColors.includes(color));

  if (availableColors.length === 0) {
    usedColors = []; // Сброс использованных цветов, если все уже были использованы
  }

  const color = availableColors[Math.floor(Math.random() * availableColors.length)];
  usedColors.push(color); // Добавляем цвет в список использованных
  return color;
}

class Router {
  constructor({ id, model_name, ip_address, hostname, created_at, color, computers = [], checked = false, opacity = 1 }) {
    this.id = id;
    this.model_name = model_name;
    this.color = color;
    this.ip_address = ip_address;
    this.hostname = hostname;
    this.created_at = new Date(created_at);
    this.checked = checked;
    this.opacity = opacity;
    this.computers = computers.map(
      (pc) => new PC({ ...pc, color: this.color }) // Привязываем цвет маршрутизатора к ПК
    );
  }
}

export default Router;


