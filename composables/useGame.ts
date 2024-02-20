import { useWindowSize } from '@vueuse/core';
import { useState } from 'nuxt/app';

const { height } = useWindowSize();

export function useGame() {
  enum Tile {
    Empty = 'empty.png',
    Black = 'black.png',
    White = 'white.png',
  }

  const gameBoard = useState<Tile[][]>('gameBoard', () => []);
  const tileSize = useState('tileSize', () => '');
  const isPlayerTurn = useState('isPlayerTurn', () => false);
  const gameStarted = useState('started', () => false);
  let boardSize: number;

  function setupBoard(size: number) {
    const newBoard: Tile[][] = [];
    for (let i = 0; i < size; i++) {
      newBoard[i] = [];
      for (let j = 0; j < size; j++) {
        newBoard[i][j] = Tile.Empty;
      }
    }
    gameBoard.value = newBoard;
    tileSize.value =
      Math.round((height.value - height.value * 0.3) / size) + 'px';

    boardSize = size;
    startingStone();
  }

  async function placeStone(col: number, row: number) {
    let clickedTile = gameBoard.value[col][row];

    await new Promise((r) => setTimeout(r, 10));
    //Check if valid move, if aiMove call function again, if player move return
    if (clickedTile != Tile.Empty && !isPlayerTurn.value) {
      aiMove(col, row);
    } else if (clickedTile != Tile.Empty && isPlayerTurn.value) {
      return;
    }

    if (isPlayerTurn.value) {
      clickedTile = Tile.Black;
      gameBoard.value[col][row] = clickedTile;
      isPlayerTurn.value = !isPlayerTurn.value;
      aiMove(col, row);
    } else {
      clickedTile = Tile.White;
      gameBoard.value[col][row] = clickedTile;
      isPlayerTurn.value = !isPlayerTurn.value;
    }
  }

  function startingStone() {
    let center = boardSize / 2 - 0.5;
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

  function getRandomBool() {
    return Math.random() > 0.5;
  }

  return {
    Tile,
    tileSize,
    gameBoard,
    gameStarted,
    setupBoard,
    placeStone,
  };
}
