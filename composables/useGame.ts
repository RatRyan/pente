export function useGame() {
  enum Tile {
    Black,
    White,
    Empty,
  }

  const boardSize = useState('boardSize', () => 0);
  const gameBoard = useState<Tile[][]>('gameBoard', () => []);
  const isPlayerTurn = useState('isPlayerTurn', () => false);

  function setupBoard(size: number) {
    const newBoard: Tile[][] = [];
    for (let i = 0; i < size; i++) {
      newBoard[i] = [];
      for (let j = 0; j < size; j++) {
        newBoard[i][j] = Tile.Empty;
      }
    }
    gameBoard.value = newBoard;
  }

  return {
    boardSize,
    gameBoard,
    isPlayerTurn,
    setupBoard,
  };
}
