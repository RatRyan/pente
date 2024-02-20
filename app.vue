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
    <div class="info-panel">
      <div></div>
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
      <div v-else>
        <p>Enter Board Size</p>
        <input type="number" v-model="gridSize" /><br />
        <button @click="handleStartGame()">Start Game</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  height: 100vh;
  display: flex;
}
.info-panel {
  width: 35vw;
  background-color: #161414;
}
.game-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.game-board {
  border: #161414 ridge 3px;
  box-shadow: 10px 10px 60px 5px #242323;
}
.row {
  height: v-bind(tileSize);
}
</style>
