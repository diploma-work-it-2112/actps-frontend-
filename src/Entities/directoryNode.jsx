class DirectoryNode {
  constructor(name, type, children = []) {
    this.name = name;
    this.type = type;
    this.children = [];

    if (type === "directory" && Array.isArray(children)) {
      this.children = children.map(
        (child) =>
          new DirectoryNode(child.name, child.type, child.children || [])
      );
    }
  }

  isFile() {
    return this.type === "file";
  }

  isDirectory() {
    return this.type === "directory";
  }
}

export default DirectoryNode;

