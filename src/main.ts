var loadPattern = [  75, 87, 75, 88, 123, 125, 137, 138, 163, 164, 171, 172, 185, 186, 212, 216, 221, 222, 235, 236, 251, 252, 261, 267, 271, 272, 301, 302, 311, 315, 317, 318, 323, 325, 361, 367, 375, 412, 416, 442, 443, 444, 463, 464, 492, 494, 542, 543, 544, 592, 593, 594, 642, 643, 644, 692, 693, 694, 742, 744, 758, 759, 760, 764, 765, 766, 792, 793, 794, 856, 861, 863, 868, 906, 911, 913, 918, 956, 961, 963, 968, 1008, 1009, 1010, 1014, 1015, 1016, 1023, 1024, 1073, 1074, 1108, 1109, 1110, 1114, 1115, 1116, 1125, 1126, 1156, 1161, 1163, 1168, 1175, 1176, 1206, 1211, 1213, 1218, 1256, 1261, 1263, 1268, 1295, 1296, 1297, 1358, 1359, 1360, 1364, 1365, 1366, 1437, 1438, 1439  ];

class Board {
    cells: Array<Cell>;
    columns: number;
    rows: number;
    boardElement: HTMLElement;
    isRunning: boolean;
    runningProcessID: number;
    constructor(columns: number, rows: number){
        this.rows = rows;
        this.columns = columns;
        this.cells = Array(columns*rows).fill(false).map( (value: boolean, index: number) => new Cell(value,index) );
        loadPattern.map( (index: number) => this.cells[index].write( true ));
        this.boardElement = document.getElementById('board');
        this.boardElement.dataset.paused = 'false';
        this.cells.map( (cell :Cell) => this.boardElement.appendChild( cell.element ) );
        this.assignCellNeighbors();
    }
    updateCells(){
        this.cells.map( (cell: Cell) => cell.getNextGeneration() ).forEach((value: boolean, index: number) => this.cells[index].write(value) );
    }
    getCellNeighbors(index: number){
        let firstInRow = index % this.columns === 0;
        let lastInRow = index % this.columns === this.columns - 1;

        let top    = this.cells[ index - this.columns ]; // will return undefined if out of range
        let bottom = this.cells[ index + this.columns ]; // will return undefined if out of range
        let topLeft = firstInRow ? undefined : this.cells[ index - this.columns - 1 ]; 
        let topRight = lastInRow ? undefined : this.cells[ index - this.columns + 1 ];
        let left = firstInRow ? undefined : this.cells[ index - 1 ];
        let right = lastInRow ? undefined : this.cells[ index + 1 ];
        let bottomLeft = firstInRow ? undefined : this.cells[ index + this.columns - 1];
        let bottomRight = lastInRow ? undefined : this.cells[ index + this.columns + 1 ];

        let neighbors = [topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight];
        return neighbors.filter(neighbor => typeof neighbor !== 'undefined');
    }
    assignCellNeighbors(){
        this.cells.map( ( cell: Cell, index: number) => cell.neighbors = this.getCellNeighbors( index ) );
    }
    randomize(){
        this.cells.forEach( cell => cell.randomize() );
    }
    stop(){
        clearInterval( this.runningProcessID );
        this.runningProcessID = 0;
        this.isRunning = false;
    }
    togglePause(){
        if ( this.isRunning ) {
            this.stop();
        } else {
            this.run();
        }
    }
    run() {
        this.runningProcessID = setInterval( function(){ this.updateCells() }.bind( this ) , 50 );
        this.isRunning = true;
    }
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
        this.value = value;
    }
    private livingNeighbors(): number {
        return this.neighbors.reduce( ( livingNeighbors: number, cell: Cell ) => livingNeighbors + ( cell.value ? 1 : 0 ), 0);
    }
    read(): boolean {
        return this.element.dataset.value.toString() === 'true';
    }
    write(value: boolean): void {
        this.value = value;
        this.element.dataset.value = value.toString();
    }
    handleClick(event){
        if ( this.boardIsPaused ) {
            this.toggle();
        }
    }
    private boardIsPaused(): boolean {
        return this.board.dataset.paused === 'true';
    }
    toggle(): void {
        this.write( this.value ? false : true );
    }
    getNextGeneration(): boolean {
        let livingNeighbors = this.livingNeighbors();
        if ( this.value ) {
            return livingNeighbors === 2 || livingNeighbors === 3
        } else {
            return livingNeighbors === 3;
        }
    }
    randomize(){
        this.write( Math.random() < 0.5 );
    }
}

var board;

function ready() {
    board = new Board(50, 30);
    board.run();
    document.querySelector('.play-pause').addEventListener('click', function( event ){
        console.log(this);
        this.togglePause();
    }.bind( board ) );
}

document.addEventListener("DOMContentLoaded", ready);