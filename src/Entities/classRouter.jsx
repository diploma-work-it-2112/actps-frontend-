class Router {
    constructor(id, name, color) {
      this.id = id;
      this.name = name;
      this.color = color;
      this.pcs = []; // Список компьютеров, подключенных к роутеру
    }
  
    addPC(pc) {
      if (pc.routerId === this.id) {
        this.pcs.push(pc);
      }
    }
  }
  
  export default Router;
  