<script setup lang="ts">
const { setupBoard, tileSize, gameBoard } = useGame();

const started = ref(false);
const gridSize = ref(19);

function handleStartGame() {
  if (gridSize.value > 39 || gridSize.value < 9 || gridSize.value % 2 != 1)
    return;

  setupBoard(gridSize.value);
  started.value = true;
}
</script>

<template>
  <div class="main-wrapper">
    <div class="side-panel-wrapper">
      <div class="side-panel">
        <div class="title">
          <p>Pente</p>
          <img src="/logo.png" />
        </div>
        <div class="info">
          <div v-if="!started" class="start-game">
            <button @click="handleStartGame" class="game-button">
              New Game
            </button>
            <p>- or -</p>
            <LoadButton />
          </div>
          <div v-else class="game-status">
            <SaveButton />
          </div>
        </div>
      </div>
    </div>
    <div class="game-wrapper">
      <div v-if="started" class="game-board">
        <div
          class="row"
          v-for="(row, rowIndex) in gameBoard"
          :key="'row-' + rowIndex"
        >
          <Tile
            class="tile"
            v-for="(tile, colIndex) in row"
            :key="'tile-' + rowIndex + '-' + colIndex"
            :x-pos="colIndex"
            :y-pos="rowIndex"
            :sprite="gameBoard[colIndex][rowIndex]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  height: 100vh;
  display: flex;
}
.side-panel-wrapper {
  width: 550px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
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
.title {
  background-color: #e6e6e6;
  font-size: 80px;
  text-align: center;
  font-family: 'Poppins';
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 1rem;
    margin-right: 2rem;
  }
  img {
    width: 80px;
    height: 80px;
  }
}
.info {
  flex: 1;
  flex-direction: column;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
}
.start-game {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.game-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.game-board {
  border: #231d10 ridge 2px;
  box-shadow: 10px 10px 60px 5px #242323;
}
.row {
  height: v-bind(tileSize);
}
</style>
