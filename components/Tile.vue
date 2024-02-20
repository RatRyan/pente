<script setup lang="ts">
const { tileSize, placeStone } = useGame();

defineProps({
  // need to set a default value for typescript
  xPos: { Number, default: 0 },
  yPos: { Number, default: 0 },
  sprite: String,
});
</script>

<template>
  <button>
    <img @click="placeStone(xPos, yPos)" :src="sprite" />
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
  filter: brightness(90%);
}
button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
