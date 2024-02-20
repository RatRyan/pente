export function useSaveData() {
  const { gameBoard, tileSize } = useGame();
  
  const downloadLink = useState('downloadLink', () => '');

  function saveGame() {
    const gameData = {
      gameBoard: gameBoard.value,
      tileSize: tileSize.value,
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
