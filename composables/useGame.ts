export function useGame() {
  const boardSize = useState('boardSize', () => 0);
  const board = useState('board', () => 0);
  const isPlayerTurn = useState('isPlayerTurn', () => false);

  return {
    boardSize,
    board,
    isPlayerTurn,
  };
}
