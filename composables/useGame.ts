import { useWindowSize } from '@vueuse/core';
import { useState } from 'nuxt/app';

const { height } = useWindowSize();

export function useGame() {
  enum Tile {
    Empty = 'empty.png',
    Black = 'black.png',
    White = 'white.png',
  }

  const board = useState<Tile[][]>('board', () => []);
  const boardSize = useState('boardSize', () => 19);
  const tileSize = useState('tileSize', () => '');
  const playerCaptures = useState('playerCaptures', () => 0);
  const computerCaptures = useState('computersCaptures', () => 0);
  const gameStarted = useState('gameStarted', () => false);
  const winner = useState<'player' | 'computer' | null>('winner', () => null);

  function setupBoard(size: number) {
    const newBoard: Tile[][] = [];
    for (let i = 0; i < size; i++) {
      newBoard[i] = [];
      for (let j = 0; j < size; j++) {
        newBoard[i][j] = Tile.Empty;
      }
    }
    board.value = newBoard;
    tileSize.value =
      Math.round((height.value - height.value * 0.3) / size) + 'px';

    boardSize.value = size;
    const center = size / 2 - 0.5;
    board.value[center][center] = Tile.White;
  }

  function placeStone(col: number, row: number) {
    if (board.value[col][row] != Tile.Empty) return;

    board.value[col][row] = Tile.Black;
    while (true) {
      const row = Math.floor(Math.random() * boardSize.value);
      const col = Math.floor(Math.random() * boardSize.value);

      if (board.value[col][row] == Tile.Empty) {
        board.value[col][row] = Tile.White;
        break;
      }
    }
    winCheck();
  }

  function checkLineWin(col: number, row: number) {
    checkLine(col, row, 1, 0);
    checkLine(col, row, 0, 1);
    checkLine(col, row, 1, 1);
    checkLine(col, row, 1, -1);
  }

  function checkLine(col: number, row: number, dCol: number, dRow: number) {
    let count = 0;
    let stone = board.value[col][row];

    for (let i = 0; i < 5; i++) {
      const currentCol = col + i * dCol;
      const currentRow = row + i * dRow;

      // Checks for in-boudsd
      if (currentCol < 0 || currentRow < 0) break;
      if (currentCol > boardSize.value || currentRow > boardSize.value) break;
      if (board.value[currentCol][currentRow] !== stone) break;

      // If all checks pass, increment the counter
      count++;
    }

    if (count === 5) {
      winner.value = stone === Tile.Black ? 'player' : 'computer';
    }
  }

  function checkForCapture(col: number, row: number) {
    checkCapture(col, row, 1, 0);
    checkCapture(col, row, -1, 0);
    checkCapture(col, row, 0, 1);
    checkCapture(col, row, 0, -1);
  }

  function checkCapture(col: number, row: number, xDir: number, yDir: number) {}

  function winCheck() {
    for (let i = 0; i < boardSize.value; i++) {
      for (let j = 0; j < boardSize.value; j++) {
        if (board.value[i][j] !== Tile.Empty) {
          checkLineWin(i, j);
          checkForCapture(i, j);
        }
      }
    }

    if (playerCaptures.value === 5) {
      winner.value = 'player';
      return;
    }
    if (computerCaptures.value === 5) {
      winner.value = 'computer';
      return;
    }
  }

  return {
    Tile,
    tileSize,
    board,
    gameStarted,
    playerCaptures,
    computerCaptures,
    setupBoard,
    placeStone,
    winner,
    boardSize,
  };
}
