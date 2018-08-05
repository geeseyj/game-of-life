class Board {
    cells: Array<Cell>;
    columns: number;
    rows: number;
    boardElement: HTMLElement;
    constructor(columns: number, rows: number){
        this.rows = rows;
        this.columns = columns;
        this.boardElement = document.getElementById('board');
        let values = Array(columns*rows).fill(false);
        this.cells = values.map( (value: boolean) => new Cell(value) );
        this.cells.map( (cell :Cell) => this.boardElement.appendChild( cell.element ) );
    }
}

class Cell {
    element: HTMLDivElement;
    value: boolean;
    constructor(value: boolean){
        this.element = document.createElement('div');
        this.element.className = 'cell';
        this.element.dataset.value = value.toString();
    }
    read(): boolean{
        return this.element.dataset.value.toString() === 'true';
    }
    write(value: boolean): void{
        this.value = value;
        this.element.dataset.value = value.toString();
    }
}

function ready() {
    let board = new Board(50, 30);
}

document.addEventListener("DOMContentLoaded", ready);