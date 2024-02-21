export function useSaveData() {
  const { board, tileSize, gameStarted, playerCaptures, computerCaptures } =
    useGame();

  const downloadLink = useState('downloadLink', () => '');

  function saveGame() {
    const gameData = {
      gameBoard: board.value,
      tileSize: tileSize.value,
      playerCaptures: playerCaptures.value,
      computerCaptures: computerCaptures.value,
    };
    const gameDataJson = JSON.stringify(gameData);
    const blob = new Blob([gameDataJson], { type: 'application/json' });
    downloadLink.value = URL.createObjectURL(blob);
  }

  function loadGame(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        //@ts-ignore
        const jsonData = JSON.parse(e.target.result);

        board.value = jsonData.gameBoard;
        tileSize.value = jsonData.tileSize;
        playerCaptures.value = jsonData.playerCaptures;
        computerCaptures.value = jsonData.computerCaptures;
        gameStarted.value = true;

        console.log(jsonData);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.readAsText(file);
  }

  return {
    downloadLink,
    saveGame,
    loadGame,
  };
}
