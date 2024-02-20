<script setup lang="ts">
const { saveGame, downloadLink } = useSaveData();
</script>

<template>
  <a @click="saveGame" :href="downloadLink" download class="game-button">
    Save Game
  </a>
</template>
