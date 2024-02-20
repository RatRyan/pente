import { useWindowSize } from '@vueuse/core';
import { useState } from 'nuxt/app';

const { height } = useWindowSize();

export function useGame() {
  enum Tile {
    Empty = 'empty.png',
    Black = 'black.png',
    White = 'white.png',
  }

  const board = useState<Tile[][]>('gameBoard', () => []);
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
    placeStone(center, center);
  }

  function aiMove(col: number, row: number) {
    if (getRandomBool()) {
      if (getRandomBool()) {
        if (getRandomBool()) {
            placeStone(col + 1, row + 1);
        } else {
          placeStone(col + 1, row - 1);
        }
      } else {
        if (getRandomBool()) {
          placeStone(col - 1, row + 1);
        } else {
          placeStone(col - 1, row - 1);
        }
      }
    } else {
      if (getRandomBool()) {
        if (getRandomBool()) {
          placeStone(col, row + 1);
        } else {
          placeStone(col, row - 1);
        }
      } else {
        if (getRandomBool()) {
          placeStone(col - 1, row);
        } else {
          placeStone(col - 1, row);
        }
      }
    }
  }

  function checkWin(col: number, row: number) {
    
    if (playerCaptures == 5 || aiCaptures == 5) {
      if(playerCaptures == 5) { 
        winner = 'player'
      } else {
        winner = 'ai'
      }
    } else {
      
    }
  }

  function getRandomBool() {
    return Math.random() > 0.5;
  }

  function getRandomInt() {
    return Math.floor(Math.random() * (boardSize +  1));
  }

  function isEmptyTile(col: number, row: number) {
    if (gameBoard.value[col][row] === Tile.Empty) {
      return true
    }
    return false
  }

  return {
    Tile,
    tileSize,
    board,
    gameStarted,
    setupBoard,
    placeStone,
    winner,
  };
}
