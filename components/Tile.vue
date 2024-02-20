<script setup lang="ts">
const { Tile, gameBoard, tileSize } = useGame();

const props = defineProps({
  xPos: Number,
  yPos: Number,
});

function onClickTile() {
  //@ts-ignore
  gameBoard.value[props.xPos][props.yPos] = 0;
}
</script>

<template>
  <button @Click="onClickTile()">
    {{
      //@ts-ignore
      gameBoard[xPos][yPos]
    }}
  </button>
</template>

<style scoped>
button {
  width: v-bind(tileSize);
  height: v-bind(tileSize);
  margin: 0px;
  padding: 0px;
  border: none;
}
</style>
