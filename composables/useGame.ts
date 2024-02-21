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
  const boardSize.value = useState('boardSize.value', () => 19);
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
    const currentTile = board.value[col][row];
    const opponentTile = currentTile === Tile.Black ? Tile.White : Tile.Black;

    // Check if the current tile is not empty and is the player's chip
    if (currentTile !== Tile.Empty) {
      // Check all directions for the opponent's chips
      const directions = [
        [-1, 0], // Left
        [1, 0],  // Right
        [0, -1], // Up
        [0, 1]   // Down
      ];

      for (const [dx, dy] of directions) {
        const newCol = col + dx;
        const newRow = row + dy;

        // Check if the new position is within the board boundaries
        if (newCol >= 0 && newCol < boardSize && newRow >= 0 && newRow < boardSize) {
          // Check if the tile is the opponent's chip
          if (board.value[newCol][newRow] === opponentTile) {
            // Check the next tile in the same direction for the opponent's chip
            const nextCol = newCol + dx;
            const nextRow = newRow + dy;

            if (nextCol >= 0 && nextCol < boardSize && nextRow >= 0 && nextRow < boardSize) {
              if (board.value[nextCol][nextRow] === opponentTile) {
                // The player's chip is sandwiched between two of the opponent's chips
                // Set the player's chip to empty
                board.value[col][row] = Tile.Empty;
                // Increment the capture count for the current player
                // ...
                switch (isPlayerTurn) {
                  case true
                }
                return; // Exit the function after capturing
              }
            }
          }
        }
      }
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
    boardSize
  };
}
