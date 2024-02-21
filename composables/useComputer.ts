export function useComputer() {
  const { board, boardSize, Tile } = useGame();

  function computerMove() {
    while (true) {
      const row = Math.floor(Math.random() * boardSize.value);
      const col = Math.floor(Math.random() * boardSize.value);

      if (board.value[col][row] == Tile.Empty) {
        board.value[col][row] == Tile.White;
        break;
      }
    }
  }

  return {
    computerMove,
  };
}
