<script setup lang="ts">
const { loadGame } = useSaveData();
</script>

<template>
  <div>
    <label for="fileInput" class="game-button">Load Game</label>
    <input
      type="file"
      @change="loadGame"
      style="display: none"
      id="fileInput"
    />
  </div>
</template>
