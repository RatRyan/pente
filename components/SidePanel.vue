<script setup lang="ts">
const { gameStarted, setupBoard } = useGame();

const newGame = ref(false);
const gridSize = ref(19);

function handleStartGame() {
  if (gridSize.value > 39 || gridSize.value < 9 || gridSize.value % 2 != 1)
    return;

  setupBoard(gridSize.value);
  gameStarted.value = true;
}
</script>

<template>
  <div class="side-panel">
    <div class="panel-title">
      <p>Pente</p>
      <img src="/logo.png" />
    </div>
    <div class="panel-content">
      <div v-if="!gameStarted" class="start-game">
        <button @click="handleStartGame" class="game-button">New Game</button>
        <LoadButton />
      </div>
      <div v-else class="game-status">
        <SaveButton />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.panel-title {
  background-color: #e0e0e0;
  text-shadow: 2px 2px 5px #7b7b7b;
  border-radius: 7px;
  font-size: 80px;
  text-align: center;
  font-family: 'Poppins';
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 1rem 2rem 1rem 0rem;
  }
  img {
    width: 80px;
    height: 80px;
  }
}
.panel-content {
  flex: 1;
  flex-direction: column;
  margin-top: 30px;
}
.start-game {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0px 50px;
}
.instructions {
}
.game-status {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
