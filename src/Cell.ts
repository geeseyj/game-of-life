export class Cell {element: HTMLDivElement;
  neighbors: Cell[];
  private value: boolean;
  constructor(value: boolean) {
    this.element = document.createElement('div');
    this.element.className = 'cell';
    this.element.dataset.value = value.toString();
    this.element.addEventListener('click', () => this.toggle());
    this.value = value;
  }
  private liveNeighbors(): number {
    return this.neighbors.reduce((liveNeighbors, cell) => liveNeighbors + (cell.value ? 1 : 0), 0);
  }
  read(): boolean {
    return this.element.dataset.value === 'true';
  }
  write(value: boolean): void {
    this.value = value;
    this.element.dataset.value = value.toString();
  }
  toggle(): void {
    this.write(this.value ? false : true);
  }
  getNextGeneration(): boolean {
    const liveNeighbors = this.liveNeighbors();
    if (this.value) {
      return liveNeighbors === 2 || liveNeighbors === 3;
    }
    return liveNeighbors === 3;
  }
  randomize(): void {
    this.write(Math.random() < 0.25);
  }
}
