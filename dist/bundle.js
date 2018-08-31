/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(5);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


function ready() {
  var board = new _Board__WEBPACK_IMPORTED_MODULE_0__["Board"](50, 30);
  document.getElementById('play-pause').addEventListener('click', function () {
    return board.togglePause();
  });
  document.getElementById('counter-control').addEventListener('click', function () {
    return board.togglePause();
  });
  document.getElementById('reset').addEventListener('click', function () {
    return board.reset();
  });
  document.getElementById('randomize').addEventListener('click', function () {
    return board.randomize();
  });
}

document.addEventListener('DOMContentLoaded', ready);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _patterns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Board =
/*#__PURE__*/
function () {
  function Board(columns, rows) {
    var _this = this;

    _classCallCheck(this, Board);

    this.columns = columns;
    this.cells = Array(rows * columns).fill(null).map(function () {
      return new _Cell__WEBPACK_IMPORTED_MODULE_0__["Cell"](false);
    });
    _patterns__WEBPACK_IMPORTED_MODULE_1__["patterns"].loadPattern.map(function (index) {
      return _this.cells[index].write(true);
    });
    this.boardElement = document.getElementById('board');
    this.cells.map(function (cell) {
      return _this.boardElement.appendChild(cell.element);
    });
    this.assignCellNeighbors();
    this.counter = document.getElementById('counter');
    this.count = 0;
    this.playPauseButton = document.getElementById('play-pause');
    this.run();
  }

  _createClass(Board, [{
    key: "updateCells",
    value: function updateCells() {
      var _this2 = this;

      this.cells.map(function (cell) {
        return cell.getNextGeneration();
      }).forEach(function (value, index) {
        return _this2.cells[index].write(value);
      });
      this.updateCounter();
    }
  }, {
    key: "updateCounter",
    value: function updateCounter() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'increment';

      if (action === 'increment') {
        this.count += 1;
      } else {
        this.count = 0;
      }

      this.counter.innerHTML = this.count.toString();
    }
  }, {
    key: "getCellNeighbors",
    value: function getCellNeighbors(index) {
      var firstInRow = index % this.columns === 0;
      var lastInRow = index % this.columns === this.columns - 1;
      var top = this.cells[index - this.columns]; // will return undefined if out of range

      var bottom = this.cells[index + this.columns]; // will return undefined if out of range

      var topLeft = firstInRow ? undefined : this.cells[index - this.columns - 1];
      var topRight = lastInRow ? undefined : this.cells[index - this.columns + 1];
      var left = firstInRow ? undefined : this.cells[index - 1];
      var right = lastInRow ? undefined : this.cells[index + 1];
      var bottomLeft = firstInRow ? undefined : this.cells[index + this.columns - 1];
      var bottomRight = lastInRow ? undefined : this.cells[index + this.columns + 1];
      var neighbors = [topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight];
      return neighbors.filter(function (neighbor) {
        return typeof neighbor !== 'undefined';
      });
    }
  }, {
    key: "assignCellNeighbors",
    value: function assignCellNeighbors() {
      var _this3 = this;

      this.cells.map(function (cell, index) {
        return cell.neighbors = _this3.getCellNeighbors(index);
      });
    }
  }, {
    key: "randomize",
    value: function randomize() {
      this.cells.forEach(function (cell) {
        return cell.randomize();
      });
      this.updateCounter('reset');
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this.runningProcessID);
      this.runningProcessID = 0;
      this.isRunning = false;
      this.playPauseButton.innerText = 'Play';
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.isRunning) {
        this.stop();
      } else {
        this.run();
      }
    }
  }, {
    key: "run",
    value: function run() {
      var _this4 = this;

      this.runningProcessID = setInterval(function () {
        return _this4.updateCells();
      }, 75);
      this.isRunning = true;
      this.playPauseButton.innerText = 'Pause';
    }
  }, {
    key: "reset",
    value: function reset() {
      this.cells.map(function (cell) {
        return cell.write(false);
      });
      this.updateCounter('reset');
    }
  }]);

  return Board;
}();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cell =
/*#__PURE__*/
function () {
  function Cell(value) {
    var _this = this;

    _classCallCheck(this, Cell);

    this.element = document.createElement('div');
    this.element.className = 'cell';
    this.element.dataset.value = value.toString();
    this.element.addEventListener('click', function () {
      return _this.toggle();
    });
    this.value = value;
  }

  _createClass(Cell, [{
    key: "liveNeighbors",
    value: function liveNeighbors() {
      return this.neighbors.reduce(function (liveNeighbors, cell) {
        return liveNeighbors + (cell.value ? 1 : 0);
      }, 0);
    }
  }, {
    key: "read",
    value: function read() {
      return this.element.dataset.value === 'true';
    }
  }, {
    key: "write",
    value: function write(value) {
      this.value = value;
      this.element.dataset.value = value.toString();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.write(this.value ? false : true);
    }
  }, {
    key: "getNextGeneration",
    value: function getNextGeneration() {
      var liveNeighbors = this.liveNeighbors();

      if (this.value) {
        return liveNeighbors === 2 || liveNeighbors === 3;
      }

      return liveNeighbors === 3;
    }
  }, {
    key: "randomize",
    value: function randomize() {
      this.write(Math.random() < 0.25);
    }
  }]);

  return Cell;
}();

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patterns", function() { return patterns; });
var patterns = {
  loadPattern: [75, 87, 75, 88, 123, 125, 137, 138, 163, 164, 171, 172, 185, 186, 212, 216, 221, 222, 235, 236, 251, 252, 261, 267, 271, 272, 301, 302, 311, 315, 317, 318, 323, 325, 361, 367, 375, 412, 416, 442, 443, 444, 463, 464, 492, 494, 542, 543, 544, 592, 593, 594, 642, 643, 644, 692, 693, 694, 742, 744, 758, 759, 760, 764, 765, 766, 792, 793, 794, 856, 861, 863, 868, 906, 911, 913, 918, 956, 961, 963, 968, 1008, 1009, 1010, 1014, 1015, 1016, 1023, 1024, 1073, 1074, 1108, 1109, 1110, 1114, 1115, 1116, 1125, 1126, 1156, 1161, 1163, 1168, 1175, 1176, 1206, 1211, 1213, 1218, 1256, 1261, 1263, 1268, 1295, 1296, 1297, 1358, 1359, 1360, 1364, 1365, 1366, 1437, 1438, 1439]
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);