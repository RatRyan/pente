const { height } = useWindowSize();

export function useGame() {
  enum Tile {
    Empty = '',
    Black = '~/assets/img/dronky.png',
    White = '',
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
      Math.round((height.value - height.value * 0.2) / size) + 'px';
  }

  return {
    Tile,
    tileSize,
    gameBoard,
    isPlayerTurn,
    setupBoard,
  };
}
