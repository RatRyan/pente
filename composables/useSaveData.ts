export function useSaveData() {
  const { gameBoard } = useGame();

  const downloadLink = useState('downloadLink', () => '');

  function saveGame() {
    const gameBoardJson = JSON.stringify(gameBoard);
    const blob = new Blob([gameBoardJson], { type: 'application/json' });
    downloadLink.value = URL.createObjectURL(blob);
  }

  function loadGame() {}

  return {
    downloadLink,
    saveGame,
    loadGame,
  };
}
