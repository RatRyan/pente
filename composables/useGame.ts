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
  let playerCaptures = 0;
  let aiCaptures = 0;
  let winner;

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

  function checkWin(col: number, row: number) {
    gameBoard.value[col][row]
    if (playerCaptures == 5 || aiCaptures == 5) {
      if (playerCaptures == 5) {
        winner = 'player'
      } else {
        winner = 'ai'
      }
    } 
    
    for (let i =  0; i < boardSize; i++) {
      if (gameBoard.value[col][i] === Tile.Black && gameBoard.value[col][i +  1] === Tile.Black &&
          gameBoard.value[col][i +  2] === Tile.Black && gameBoard.value[col][i +  3] === Tile.Black &&
          gameBoard.value[col][i +  4] === Tile.Black) {
        winner = 'player';
        return;
      }
      if (gameBoard.value[col][i] === Tile.White && gameBoard.value[col][i +  1] === Tile.White &&
          gameBoard.value[col][i +  2] === Tile.White && gameBoard.value[col][i +  3] === Tile.White &&
          gameBoard.value[col][i +  4] === Tile.White) {
        winner = 'ai';
        return;
      }
    }
  
    // Check vertically
    for (let i =  0; i < boardSize; i++) {
      if (gameBoard.value[i][row] === Tile.Black && gameBoard.value[i +  1][row] === Tile.Black &&
          gameBoard.value[i +  2][row] === Tile.Black && gameBoard.value[i +  3][row] === Tile.Black &&
          gameBoard.value[i +  4][row] === Tile.Black) {
        winner = 'player';
        return;
      }
      if (gameBoard.value[i][row] === Tile.White && gameBoard.value[i +  1][row] === Tile.White &&
          gameBoard.value[i +  2][row] === Tile.White && gameBoard.value[i +  3][row] === Tile.White &&
          gameBoard.value[i +  4][row] === Tile.White) {
        winner = 'ai';
        return;
      }
    }
  }

  function getRandomBool() {
    return Math.random() > 0.5;
  }

  function getRandomInt() {
    return Math.floor(Math.random() * (boardSize + 1));
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
    gameBoard,
    gameStarted,
    setupBoard,
    placeStone,
    winner,
  };
}
