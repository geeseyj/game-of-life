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
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var loadPattern = [75, 87, 75, 88, 123, 125, 137, 138, 163, 164, 171, 172, 185, 186, 212, 216, 221, 222, 235, 236, 251, 252, 261, 267, 271, 272, 301, 302, 311, 315, 317, 318, 323, 325, 361, 367, 375, 412, 416, 442, 443, 444, 463, 464, 492, 494, 542, 543, 544, 592, 593, 594, 642, 643, 644, 692, 693, 694, 742, 744, 758, 759, 760, 764, 765, 766, 792, 793, 794, 856, 861, 863, 868, 906, 911, 913, 918, 956, 961, 963, 968, 1008, 1009, 1010, 1014, 1015, 1016, 1023, 1024, 1073, 1074, 1108, 1109, 1110, 1114, 1115, 1116, 1125, 1126, 1156, 1161, 1163, 1168, 1175, 1176, 1206, 1211, 1213, 1218, 1256, 1261, 1263, 1268, 1295, 1296, 1297, 1358, 1359, 1360, 1364, 1365, 1366, 1437, 1438, 1439];
class Board {
    constructor(columns, rows) {
        this.rows = rows;
        this.columns = columns;
        this.paused = false;
        this.cells = Array(columns * rows).fill(false).map((value, index) => new Cell(value, index));
        loadPattern.map((index) => this.cells[index].write(true));
        this.boardElement = document.getElementById('board');
        this.boardElement.dataset.paused = 'false';
        this.cells.map((cell) => this.boardElement.appendChild(cell.element));
        this.assignCellNeighbors();
    }
    updateCells() {
        this.cells.map((cell) => cell.getNextGeneration()).forEach((value, index) => this.cells[index].write(value));
    }
    getCellNeighbors(index) {
        let firstInRow = index % this.columns === 0;
        let lastInRow = index % this.columns === this.columns - 1;
        let topLeft = firstInRow ? undefined : this.cells[index - this.columns - 1];
        let top = this.cells[index - this.columns]; // will return undefined if out of range
        let topRight = lastInRow ? undefined : this.cells[index - this.columns + 1];
        let left = firstInRow ? undefined : this.cells[index - 1];
        let right = lastInRow ? undefined : this.cells[index + 1];
        let bottomLeft = firstInRow ? undefined : this.cells[index + this.columns - 1];
        let bottom = this.cells[index + this.columns]; // will return undefined if out of range
        let bottomRight = lastInRow ? undefined : this.cells[index + this.columns + 1];
        let neighbors = [topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight];
        return neighbors.filter(neighbor => typeof neighbor !== 'undefined');
    }
    assignCellNeighbors() {
        this.cells.map((cell, index) => cell.neighbors = this.getCellNeighbors(index));
    }
    randomize() { }
    clear() {
        clearInterval(this.runningProcessID);
    }
    pause() { }
    isPaused() { }
    run() {
        return setInterval(this.updateCells.bind(this), 250);
    }
}
class Cell {
    constructor(value, index) {
        this.element = document.createElement('div');
        this.element.className = 'cell';
        this.element.dataset.value = value.toString();
        this.board = this.element.parentElement;
        this.element.addEventListener('click', this.handleClick);
        this.value = value;
    }
    livingNeighbors() {
        return this.neighbors.reduce((livingNeighbors, cell) => livingNeighbors + (cell.value ? 1 : 0), 0);
    }
    read() {
        return this.element.dataset.value.toString() === 'true';
    }
    write(value) {
        this.value = value;
        this.element.dataset.value = value.toString();
    }
    handleClick(event) {
        if (this.boardIsPaused) {
            this.toggle();
        }
    }
    boardIsPaused() {
        return this.board.dataset.paused === 'true';
    }
    toggle() {
        this.write(this.value ? false : true);
    }
    getNextGeneration() {
        let livingNeighbors = this.livingNeighbors();
        if (this.value) {
            return livingNeighbors === 2 || livingNeighbors === 3;
        }
        else {
            return livingNeighbors === 3;
        }
    }
}
var board;
function ready() {
    board = new Board(50, 30);
    let id = board.run();
    setTimeout(function () { clearInterval(id); }, 5000);
}
document.addEventListener("DOMContentLoaded", ready);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);