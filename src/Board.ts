import { Cell } from './Cell';
import { patterns } from './patterns';

export class Board {
  private boardElement: HTMLElement;
  private cells: Cell[];
  private columns: number;
  private count: number;
  private counter: HTMLElement;
  private isRunning: boolean;
  private runningProcessID: number;
  private playPauseButton: HTMLElement;
  private stepButton: HTMLElement;
  constructor(columns: number, rows: number) {
    this.columns = columns;
    this.cells = Array(rows * columns).fill(null).map(() => new Cell(false));
    patterns.loadPattern.map(index => this.cells[index].write(true));
    this.boardElement = document.getElementById('board');
    this.cells.map((cell :Cell) => this.boardElement.appendChild(cell.element));
    this.assignCellNeighbors();
    this.counter = document.getElementById('counter');
    this.count = 0;
    this.playPauseButton = document.getElementById('play-pause');
    this.stepButton = document.getElementById('step');
    this.run();
  }
  updateCells(): void {
    this.cells.map(cell => cell.getNextGeneration())
      .forEach((value, index) => this.cells[index].write(value));
    this.updateCounter();
  }
  private updateCounter(action: string = 'increment'): void {
    if (action === 'increment') {
      this.count += 1;
    } else {
      this.count = 0;
    }
    this.counter.innerHTML = this.count.toString();
  }
  private getCellNeighbors(index: number): Cell[] {
    const firstInRow = index % this.columns === 0;
    const lastInRow = index % this.columns === this.columns - 1;

    const top = this.cells[index - this.columns]; // will return undefined if out of range
    const bottom = this.cells[index + this.columns]; // will return undefined if out of range
    const topLeft = firstInRow ? undefined : this.cells[index - this.columns - 1];
    const topRight = lastInRow ? undefined : this.cells[index - this.columns + 1];
    const left = firstInRow ? undefined : this.cells[index - 1];
    const right = lastInRow ? undefined : this.cells[index + 1];
    const bottomLeft = firstInRow ? undefined : this.cells[index + this.columns - 1];
    const bottomRight = lastInRow ? undefined : this.cells[index + this.columns + 1];

    const neighbors = [topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight];
    return neighbors.filter(neighbor => typeof neighbor !== 'undefined');
  }
  private assignCellNeighbors(): void {
    this.cells.map((cell: Cell, index: number) => cell.neighbors = this.getCellNeighbors(index));
  }
  randomize(): void {
    this.cells.forEach(cell => cell.randomize());
    this.updateCounter('reset');
  }
  private stop(): void {
    clearInterval(this.runningProcessID);
    this.runningProcessID = 0;
    this.isRunning = false;
    this.playPauseButton.innerText = 'Play';
    this.stepButton.classList.remove('inactive');
  }
  togglePause(): void {
    if (this.isRunning) {
      this.stop();
    } else {
      this.run();
    }
  }
  run(): void {
    this.runningProcessID = setInterval(() => this.updateCells() , 75);
    this.isRunning = true;
    this.playPauseButton.innerText = 'Pause';
    this.stepButton.classList.add('inactive');
  }
  reset(): void {
    this.cells.map((cell: Cell) => cell.write(false));
    this.updateCounter('reset');
  }
}
