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
  const isPlayerTurn = useState('isPlayerTurn', () => false);
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
    isPlayerTurn.value == true;
  }

  function placeStone(col: number, row: number) {
    let clickedTile = board.value[col][row];
    if (clickedTile != Tile.Empty) return;

    board.value[col][row] = Tile.Black;
    isPlayerTurn.value = false;
    while (true) {
      const row = Math.floor(Math.random() * boardSize.value);
      const col = Math.floor(Math.random() * boardSize.value);

      if (board.value[col][row] == Tile.Empty) {
        board.value[col][row] = Tile.White;
        break;
      }
    }
    winCheck(col, row);
  }

  function checkLineWin(col: number, row: number) {
    if (checkLine(col, row, 1, 0)) return;
    if (checkLine(col, row, 0, 1)) return;
    if (checkLine(col, row, 1, 1)) return;
    if (checkLine(col, row, 1, -1)) return;
  }

  function checkLine(col: number, row: number, dCol: number, dRow: number) {
    let count = 0;
    let player = board.value[col][row];

    for (let i = 0; i < 5; i++) {
      let newCol = col + i * dCol;
      let newRow = row + i * dRow;

      if (
        newCol >= 0 &&
        newCol < boardSize.value &&
        newRow >= 0 &&
        newRow < boardSize.value
      ) {
        if (board.value[newCol][newRow] === player) {
          count++;
        } else {
          break;
        }
      }
    }

    if (count === 5) {
      winner.value = player === Tile.Black ? 'player' : 'computer';
    }
  }

  function winCheck() {
    if (playerCaptures.value === 5) {
      winner.value = 'player';
      return;
    }
    if (computerCaptures.value === 5) {
      winner.value = 'computer';
      return;
    }

    // Iterate over the entire board
    for (let i = 0; i < boardSize.value; i++) {
      for (let j = 0; j < boardSize.value; j++) {
        // Check for a win condition if the tile is not empty
        if (board.value[i][j] !== Tile.Empty) {
          checkLineWin(i, j);
        }
      }
    }
  }

  function captureCheck(col: number, row: number) {}

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
