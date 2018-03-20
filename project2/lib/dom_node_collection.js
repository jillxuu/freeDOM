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


}
