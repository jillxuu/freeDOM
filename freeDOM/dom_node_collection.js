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

  val(newVal){
    if (newVal !== undefined){
      for (let i = 0; i < this.nodes.length; i++){
        this.nodes[i].value = newVal;
      }
    } else {
      for (let i = 0; i < this.nodes.length; i++){
        return this.nodes[i].value;
      }
    }
  }

  empty(){
    this.html('');
  }

  append(arg){
    if (this.nodes.length === 0) return;

    if (typeof arg === "string") {
      this.nodes.forEach( (node) => {
        node.innerHTML += arg;
      });
    } else if (arg instanceof DOMNodeCollection) {
      this.nodes.forEach( (node) => {
        arg.nodes.forEach( (argNode) => {
          node.appendChild(argNode.cloneNode(true));
        });
      });
    }
  }

  attr(name, value) {
    if (typeof value === "string") {
      this.nodes.forEach(node => node.setAttribute(name, value));
    } else {
      return this.nodes[0].getAttribute(name);
    }
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

  toggleClass(toggleClass) {
    this.each(node => node.classList.toggle(toggleClass));
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

  on(type, callback) {
    this.nodes.forEach((el) => {
      el.addEventListener(type, callback);
      el.callback = callback;
    });
  }

  off(type) {
    this.nodes.forEach((el) => {
      el.removeEventListener(type, el.callback);
    });
  }
}

module.exports = DOMNodeCollection;
