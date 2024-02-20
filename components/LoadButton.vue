<script setup lang="ts">
const { loadGame } = useSaveData();
</script>

<template>
  <div class="game-button">
    <label for="fileInput">Load Game</label>
    <input
      type="file"
      @change="loadGame"
      style="display: none"
      id="fileInput"
    />
  </div>
</template>
