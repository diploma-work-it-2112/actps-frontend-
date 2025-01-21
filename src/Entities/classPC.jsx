class PC {
  constructor(id, name, color, opacity = 1, routerId, checked = false) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.opacity = opacity;
    this.routerId = routerId;
    this.checked = checked;
  }
}

export default PC;
