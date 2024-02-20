<script setup lang="ts">
const { gameStarted, tileSize, gameBoard } = useGame();
</script>

<template>
  <div class="main-wrapper">
    <div class="side-panel-wrapper">
      <SidePanel />
    </div>
    <div class="game-wrapper">
      <GameBoard />
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
.game-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
