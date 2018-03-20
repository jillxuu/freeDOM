window.$l = $l;
const DOMNodeCollection = require('./dom_node_collection.js');


function $l(selector){
  if (selector instanceof HTMLElement) {
    let htmlEls = [selector];
    return new DOMNodeCollection(htmlEls);
  } else if (typeof selector === 'function'){
    document.addEventListener('DOMContentLoaded', selector);
  } else{
    const el = document.querySelectorAll(selector);
    let els = Array.from(el);
    return new DOMNodeCollection(els);
  }
}
