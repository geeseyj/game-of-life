class Board {
    cells: Array<Cell>;
    columns: number;
    rows: number;
    boardElement: HTMLElement;
    paused: boolean;
    constructor(columns: number, rows: number){
        this.rows = rows;
        this.columns = columns;
        this.boardElement = document.getElementById('board');
        this.paused = false;
        this.boardElement.dataset.paused = 'false';
        this.cells = Array(columns*rows).fill(false).map( (value: boolean, index: number) => new Cell(value,index) );
        this.assignCellNeighbors();
        this.cells.map( (cell :Cell) => this.boardElement.appendChild( cell.element ) );
    }
    updateCells(){
        let count = this.cells.map(function(cell: Cell, index: number){
            this.getCellNeighbors(index).reduce(function(cell: Cell){ return cell.element.dataset.value === 'true' ? 1 : 0 });
        });
        console.log( count );
    }
    getCellNeighbors(index: number){
        let firstInRow = index % this.columns === 0;
        let lastInRow = index % this.columns === this.columns - 1;

        let topLeft = firstInRow ? undefined : this.cells[ index - this.columns - 1 ]; 
        let top = this.cells[ index - this.columns ]; // will return undefined if out of range
        let topRight = lastInRow ? undefined : this.cells[ index - this.columns + 1 ];
        let left = firstInRow ? undefined : this.cells[ index - 1 ];
        let right = lastInRow ? undefined : this.cells[ index + 1 ];
        let bottomLeft = firstInRow ? undefined : this.cells[ index + this.columns - 1];
        let bottom = this.cells[ index + this.columns ]; // will return undefined if out of range
        let bottomRight = lastInRow ? undefined : this.cells[ index + this.columns + 1 ];

        let neighbors = [topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight];

        return neighbors.filter(neighbor => typeof neighbor !== 'undefined');
    }
    assignCellNeighbors(){
        this.cells.map((cell: Cell, index: number) => cell.neighbors = this.getCellNeighbors(index));
    }
    randomize(){}
    clear(){}
    pause(){}
    isPaused(){}
    run(){}
}

class Cell {
    element: HTMLDivElement;
    board: HTMLElement;
    value: boolean;
    neighbors: Array<Cell>;
    index: number;//not needed in the end
    constructor(value: boolean, index: number){
        this.element = document.createElement('div');
        this.element.className = 'cell';
        this.element.dataset.value = value.toString();
        this.board = this.element.parentElement;
        this.element.addEventListener('click', this.handleClick);
        this.index = index;
    }
    read(): boolean {
        return this.element.dataset.value.toString() === 'true';
    }
    write(value: boolean): void {
        this.value = value;
        this.element.dataset.value = value.toString();
    }
    handleClick(event){
        if (this.boardIsPaused) {
            this.toggle();
        }
    }
    boardIsPaused(): boolean {
        return this.board.dataset.paused === 'true';
    }
    toggle(): void {
        this.write( this.value ? false : true );
    }
    age(livingNeighbors: number): void {
        if ( this.value ) {
            if ( livingNeighbors < 2 || livingNeighbors > 3 ){
                this.write( false );
            } 
        } else {
            if ( livingNeighbors === 3 ){
                this.write( true );
            }
        }
    }
}

function ready() {
    let board = new Board(50, 30);
    console.log( board );
}

document.addEventListener("DOMContentLoaded", ready);