<script setup lang="ts">
const { gameStarted, setupBoard, playerCaptures, computerCaptures, winner } =
  useGame();

const newGame = ref(false);
const gridSize = ref(19);

function startGame() {
  if (gridSize.value > 39 || gridSize.value < 9 || gridSize.value % 2 != 1)
    return;

  playerCaptures.value = 0;
  computerCaptures.value = 0;
  winner.value = null;
  setupBoard(gridSize.value);
  gameStarted.value = true;
}

function backToMenu() {
  gameStarted.value = false;
  newGame.value = false;
  winner.value = null;
}
</script>

<template>
  <div class="side-panel">
    <div class="panel-title">
      <p>Pente</p>
      <img src="/logo.png" />
    </div>
    <div class="panel-content">
      <div v-if="!gameStarted && !newGame" class="start-game">
        <button @click="newGame = true" class="game-button">New Game</button>
        <LoadButton />
      </div>
      <div v-if="!gameStarted && newGame" class="start-game">
        <div class="create-board">
          <label>Enter Board Size:</label>
          <input type="number" id="sizeInput" v-model="gridSize" class="board-size" />
          <button id="startGame" @click="startGame()" class="game-button">Start Game</button>
        </div>
      </div>
      <div v-if="gameStarted" class="game-status">
        <div v-if="winner == null" class="capturppe-trackers">
          <div class="stat-tracker">
            <h2>Player Captures: {{ playerCaptures }}</h2>
          </div>
          <div class="stat-tracker">
            <h2>Computer Captures: {{ computerCaptures }}</h2>
          </div>
        </div>
        <div v-else>
          <h1>The {{ winner }} is the winner!</h1>
        </div>
        <div>
          <SaveButton />
          <button @click="backToMenu()" class="game-button">
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-panel {
  width: 95%;
  height: 97.5%;
  border: solid 1px rgb(66, 66, 66);
  border-radius: 7px;
  background-color: #f0f0f0;
  box-shadow: 10px 10px 30px 10px #262626;
  display: flex;
  flex-direction: column;
}
.panel-title {
  background-color: #e0e0e0;
  text-shadow: 2px 2px 5px #7b7b7b;
  border-radius: 7px;
  font-size: 80px;
  text-align: center;
  font-family: 'Poppins';
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 1rem 2rem 1rem 0rem;
  }
  img {
    width: 80px;
    height: 80px;
  }
}
.panel-content {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
}
.start-game {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0px 50px;
}
label {
  font-family: 'poppins';
  font-weight: 500;
  font-size: 30px;
}
.create-board {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.board-size {
  margin: 20px 0px;
  font-size: 30px;
  text-align: center;
  width: 70px;
  padding: 10px 0px;
  border-radius: 7px;
  border: none;
}
.game-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.capture-trackers {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 100px;
}
</style>
