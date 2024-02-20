<script setup lang="ts">
const { setupBoard, tileSize, gameBoard } = useGame();
const started = ref(false);
const gridSize = ref(9);

function handleStartGame() {
  if (gridSize.value > 39 || gridSize.value < 9 || gridSize.value % 2 != 1)
    return;

  setupBoard(gridSize.value);
  started.value = true;
}
</script>

<template>
  <div class="game-wrapper">
    <div v-if="started">
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
</template>

<style scoped>
.game-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.row {
  height: v-bind(tileSize);
}
</style>
