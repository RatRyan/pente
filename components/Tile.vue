<script setup lang="ts">
const props = defineProps({
  xPos: Number,
  yPos: Number,
});
</script>

<template>
  <Button>X:{{ xPos }} Y: {{ yPos }}</Button>
</template>

<style scoped>
button {
  width: 30px;
  height: 30px;
  margin: 0px;
  padding: 0px;
  border: none;
}
</style>
