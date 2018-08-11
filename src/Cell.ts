export class Cell {
    element: HTMLDivElement;
    neighbors: Array<Cell>;
    value: boolean;
    constructor(value: boolean ){
        this.element = document.createElement('div');
        this.element.className = 'cell';
        this.element.dataset.value = value.toString();
        this.element.addEventListener('click', () => this.toggle() );
        this.value = value;
    }
    private livingNeighbors(): number {
        return this.neighbors.reduce( ( livingNeighbors: number, cell: Cell ) => livingNeighbors + ( cell.value ? 1 : 0 ), 0);
    }
    read(): boolean {
        return this.element.dataset.value === 'true';
    }
    write(value: boolean): void {
        this.value = value;
        this.element.dataset.value = value.toString();
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
    randomize(): void {
        this.write( Math.random() < 0.25 );
    }
}