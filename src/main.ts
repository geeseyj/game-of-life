import { Board } from "./Board";

function ready(): void {
    var board;
    board = new Board(50, 30);
    board.run();
    document.getElementById('play-pause').addEventListener('click', () => board.togglePause() );
    document.getElementById('counter-control').addEventListener('click', () => board.togglePause() );
    document.getElementById('reset').addEventListener('click', () => board.reset() );
    document.getElementById('randomize').addEventListener('click', () => board.randomize() );
}

document.addEventListener("DOMContentLoaded", ready);