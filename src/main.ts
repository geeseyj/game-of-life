import { Board } from './Board';

function ready(): void {
  const board = new Board(50, 30);

  document.getElementById('play-pause').addEventListener('click', () => board.togglePause());
  document.getElementById('counter-control').addEventListener('click', () => board.togglePause());
  document.getElementById('reset').addEventListener('click', () => board.reset());
  document.getElementById('randomize').addEventListener('click', () => board.randomize());
  document.getElementById('step').addEventListener('click', () => board.updateCells());
}

document.addEventListener('DOMContentLoaded', ready);
