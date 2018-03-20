class DOMNodeCollection {
  constructor(htmlEl) {
    this.nodes = htmlEl;
    this.returnSelf();
  }

  returnSelf() {
    return this;
  }

  html(arg){
    if (arg || arg === ''){
      for (let i = 0; i < this.nodes.length; i++){
        this.nodes[i].innerHTML = arg;
      }
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty(){
    this.html('');
  }

  append(arg){
    if (arg instanceof DOMNodeCollection){
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = 0; j < arg.nodes.length; j++) {
          this.nodes[i].appendChild(arg.nodes[j]);
        }
      }
    } else if (arg instanceof HTMLElement) {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].appendChild(arg);
      }
    } else {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML = arg;
      }
    }
  }

  attr(name, value) {
      this.nodes.forEach(node => {
        node.setAttribute(name, value);
      });
    }

  addClass(className) {
    this.nodes.forEach(node => {
      node.classList.add(className);
    });
  }

  removeClass(className) {
    this.nodes.forEach(node => {
      node.classList.remove(className);
    });
  }

  children() {
    let childrenNodes = [];
    for (var i = 0; i < this.nodes.length; i++) {
      for (var j = 0; j < this.nodes[i].children.length; j++) {
        childrenNodes.push(this.nodes[i].children[j]);
      }
    }
    return new DOMNodeCollection(childrenNodes);
  }

  parent() {
    let parentNode = [];
    for (var i = 0; i < this.nodes.length; i++) {
      parentNode.push(this.nodes[i].parentNode);
    }
    return new DOMNodeCollection(parentNode);
  }

  find(selector){
    let res = [];
    if (this.children().length === 0) {
      return undefined;
    }
    this.nodes.forEach((el) => {
      res.push(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(res);
  }

  remove() {
    this.nodes.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  }
}
