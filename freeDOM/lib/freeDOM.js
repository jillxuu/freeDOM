/******/ (function(modules) {
/******/ 	var installedModules = {};
/******/
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		module.l = true;
/******/
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
const Test = __webpack_require__(2);
// ".class_name"
// <div class="class_name" ></div>

function $l(selector){
  if (selector instanceof HTMLElement) {
    let els = [selector];
    return new DOMNodeCollection(els);
  } else if (typeof selector === 'function'){
    document.addEventListener('DOMContentLoaded', selector);
  }
  else{
    const el = document.querySelectorAll(selector);
    let els = Array.from(el);
    return new DOMNodeCollection(els);
  }
}

$l.extend = function (...objects) {
  return Object.assign({}, ...objects);
};

$l.ajax = function(obj) {
  const defaults = {'success': (e) => {console.log(e);}, 'contentType': 'application/x-www-form-urlencoded; charset=UTF-8', 'method': 'GET', 'data':  '', 'url': '/', 'error': (e) => {console.log(e);}};
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


window.$l = $l;

$l( () => {
  $l.ajax({url: "https://jsonplaceholder.typicode.com/posts"});

});



/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(arr) {
    this.nodes = arr;
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

  addClass(class_name) {
    this.nodes.forEach(node => {
      node.classList.add(class_name);
    });
  }

  removeClass(class_name) {
    this.nodes.forEach(node => {
      node.classList.remove(class_name);
    });
  }

  children() {
    let res = [];
    for (var i = 0; i < this.nodes.length; i++) {
      for (var j = 0; j < this.nodes[i].children.length; j++) {
        res.push(this.nodes[i].children[j]);
      }
    }
    return new DOMNodeCollection(res);
  }

  parent() {
    let res = [];
    for (var i = 0; i < this.nodes.length; i++) {
      res.push(this.nodes[i].parentNode);
    }
    return new DOMNodeCollection(res);
  }

  // toggleClass(toggleClass) {
  //   this.each(node => node.classList.toggle(toggleClass));
  // }
  //
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

class Test {
  constructor() {

  }
  run(){
    const test = $l('p');
    test.on('click', () => console.log("It's working!"));

    setTimeout(() => test.off('click'), 5000);


  }
}

module.exports = Test;

/***/ })
/******/ ]);
