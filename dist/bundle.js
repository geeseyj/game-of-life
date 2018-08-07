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

class Board {
    constructor(columns, rows) {
        this.rows = rows;
        this.columns = columns;
        this.boardElement = document.getElementById('board');
        this.paused = false;
        this.boardElement.dataset.paused = 'false';
        this.cells = Array(columns * rows).fill(false).map((value, index) => new Cell(value, index));
        this.assignCellNeighbors();
        this.cells.map((cell) => this.boardElement.appendChild(cell.element));
    }
    updateCells() {
        let count = this.cells.map(function (cell, index) {
            this.getCellNeighbors(index).reduce(function (cell) { return cell.element.dataset.value === 'true' ? 1 : 0; });
        });
        console.log(count);
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
    clear() { }
    pause() { }
    isPaused() { }
    run() { }
}
class Cell {
    constructor(value, index) {
        this.element = document.createElement('div');
        this.element.className = 'cell';
        this.element.dataset.value = value.toString();
        this.board = this.element.parentElement;
        this.element.addEventListener('click', this.handleClick);
        this.index = index;
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
    age(livingNeighbors) {
        if (this.value) {
            if (livingNeighbors < 2 || livingNeighbors > 3) {
                this.write(false);
            }
        }
        else {
            if (livingNeighbors === 3) {
                this.write(true);
            }
        }
    }
}
function ready() {
    let board = new Board(50, 30);
    console.log(board);
}
document.addEventListener("DOMContentLoaded", ready);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);