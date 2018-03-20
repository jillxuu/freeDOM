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


$l.extend = function (...objects) {
  return Object.assign({}, ...objects);
};

$l.ajax = function(obj) {
  const defaults = {
    'success': (e) => {console.log(e);},
    'contentType': 'application/x-www-form-urlencoded; charset=UTF-8',
    'method': 'GET',
    'data':  '',
    'url': '/',
    'error': (e) => {console.log(e);}
  };
  const options = $l.extend(defaults, obj);
  const xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url);

  xhr.onload = function () {
    if (xhr.status === 200) {
      options.success(JSON.parse(xhr.response));
    } else {
      options.error(xhr.status);
    }
  };

  const optionalData = options.data;
  xhr.send(optionalData);
};
