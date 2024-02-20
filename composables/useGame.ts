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
  }

  function placeStone(row: number, col: number) {
    let clickedTile = gameBoard.value[col][row];
    if (clickedTile != Tile.Empty) return;

    if (isPlayerTurn.value) {
      clickedTile = Tile.Black;
    } else {
      clickedTile = Tile.White;
    }
  }

  return {
    Tile,
    tileSize,
    gameBoard,
    setupBoard,
    placeStone,
  };
}
