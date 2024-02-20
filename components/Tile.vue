<script setup lang="ts">
const { Tile, gameBoard, tileSize, isPlayerTurn } = useGame();
const props = defineProps({
  xPos: Number,
  yPos: Number,
  sprite: String,
});

function onClickTile() {
  if (isPlayerTurn.value) {
    //@ts-ignore
    gameBoard.value[props.xPos][props.yPos] = Tile.Black;
  } else {
    //@ts-ignore
    gameBoard.value[props.xPos][props.yPos] = Tile.White;
  }
  isPlayerTurn.value = !isPlayerTurn.value;
}
</script>

<template>
  <button>
    <img @click="onClickTile()" :src="sprite" />
  </button>
</template>

<style scoped>
button {
  width: v-bind(tileSize);
  height: v-bind(tileSize);
  margin: 0px;
  padding: 0px;
  border: none;
  transition: filter 0.3s ease-out;
}
button:hover {
  filter: brightness(50%);
}
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
