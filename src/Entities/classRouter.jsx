import PC from "./classPC";
class Router {
  constructor(id, name, color, opacity = 1, pcs = [], checked = false) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.opacity = opacity;
    this.pcs = pcs.map(
      (pc) => new PC(pc.id, pc.name, pc.color, pc.opacity, id, pc.checked)
    );
    this.checked = checked;
  }
}

export default Router;
