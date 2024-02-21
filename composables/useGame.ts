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
    winCheck(col, row)
  }

  function winCheck(col: number, row: number) {
    if (playerCaptures.value === 5) {
      winner.value = 'player'
      return
    }
    if (computerCaptures.value === 5) {
      winner.value = 'computer'
      return
    }
    // Check horizontally
    for (let i = 0; i < boardSize.value; i++) {
      if (board.value[col][i] === Tile.Black && board.value[col][i + 1] === Tile.Black &&
        board.value[col][i + 2] === Tile.Black && board.value[col][i + 3] === Tile.Black &&
        board.value[col][i + 4] === Tile.Black) {
        winner.value = 'player';
        return;
      }
      if (board.value[col][i] === Tile.White && board.value[col][i + 1] === Tile.White &&
        board.value[col][i + 2] === Tile.White && board.value[col][i + 3] === Tile.White &&
        board.value[col][i + 4] === Tile.White) {
        winner.value = 'computer';
        return;
      }
    }

    // Check vertically
    for (let i = 0; i < boardSize.value; i++) {
      if (board.value[i][row] === Tile.Black && board.value[i + 1][row] === Tile.Black &&
        board.value[i + 2][row] === Tile.Black && board.value[i + 3][row] === Tile.Black &&
        board.value[i + 4][row] === Tile.Black) {
        winner.value = 'player';
        return;
      }
      if (board.value[i][row] === Tile.White && board.value[i + 1][row] === Tile.White &&
        board.value[i + 2][row] === Tile.White && board.value[i + 3][row] === Tile.White &&
        board.value[i + 4][row] === Tile.White) {
        winner.value = 'computer';
        return;
      }
    }

    // Check diagonally
    for (let i = 0; i < boardSize.value - 4; i++) {
      for (let j = 0; j < boardSize.value - 4; j++) {
        if (board.value[i][j] === Tile.Black && board.value[i + 1][j + 1] === Tile.Black &&
          board.value[i + 2][j + 2] === Tile.Black && board.value[i + 3][j + 3] === Tile.Black &&
          board.value[i + 4][j + 4] === Tile.Black) {
          winner.value = 'player';
          return;
        }
        if (board.value[i][j] === Tile.White && board.value[i + 1][j + 1] === Tile.White &&
          board.value[i + 2][j + 2] === Tile.White && board.value[i + 3][j + 3] === Tile.White &&
          board.value[i + 4][j + 4] === Tile.White) {
          winner.value = 'computer';
          return;
        }
      }
    }

    // Check diagonally (secondary diagonal)
    for (let i = 0; i < boardSize.value - 4; i++) {
      for (let j = 4; j < boardSize.value; j++) {
        if (board.value[i][j] === Tile.Black && board.value[i + 1][j - 1] === Tile.Black &&
          board.value[i + 2][j - 2] === Tile.Black && board.value[i + 3][j - 3] === Tile.Black &&
          board.value[i + 4][j - 4] === Tile.Black) {
          winner.value = 'player';
          return;
        }
        if (board.value[i][j] === Tile.White && board.value[i + 1][j - 1] === Tile.White &&
          board.value[i + 2][j - 2] === Tile.White && board.value[i + 3][j - 3] === Tile.White &&
          board.value[i + 4][j - 4] === Tile.White) {
          winner.value = 'computer';
          return;
        }
      }
    }
  }

  function captureCheck(col: number, row: number) {
    
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
    boardSize
  };
}
