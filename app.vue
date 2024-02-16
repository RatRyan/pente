<script setup lang="ts">
const { setupBoard, gameBoard } = useGame();
setupBoard(19);
</script>

<template>
  <div>
    <div v-for="(row, rowIndex) in gameBoard" :key="'row-' + rowIndex">
      <span
        class="tile"
        v-for="(tile, colIndex) in row"
        :key="'tile-' + rowIndex + '-' + colIndex"
      >
        {{ tile }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
