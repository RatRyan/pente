<script setup lang="ts">
const { setupBoard, gameBoard } = useGame();
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
  <div v-if="started">
    <div v-for="(row, rowIndex) in gameBoard" :key="'row-' + rowIndex">
      <button
        class="tile"
        v-for="(tile, colIndex) in row"
        :key="'tile-' + rowIndex + '-' + colIndex"
      >
        {{ tile }}
      </button>
    </div>
  </div>
  <div v-else>
    <p>Enter Board Size</p>
    <input type="number" v-model="gridSize" /><br />
    <button @click="handleStartGame()">Start Game</button>
  </div>
</template>

<style scoped></style>
