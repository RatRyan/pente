<script setup lang="ts">
const { gameStarted, gameBoard, tileSize } = useGame();
</script>

<template>
  <div v-if="gameStarted" class="game-board">
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
</template>

<style scoped>
.game-board {
  border: #231d10 ridge 2px;
  box-shadow: 10px 10px 60px 5px #242323;
}
.row {
  height: v-bind(tileSize);
}
</style>
