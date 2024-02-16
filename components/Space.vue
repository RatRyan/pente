<script setup lang="ts">
const props = defineProps({
  player: {
    type: Number,
    require: true,
  }
})


</script>
<template>
  <div :class="{ 'black': player ===  1, 'white': player ===  2 }"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  player: {
    type: Number,
    required: true,
  }
})
</script>

<template>
  <div :class="{ 'black': player ===  1, 'white': player ===  2 }"></div>
</template>

<style scoped>
.black, .white {
  position: absolute;
  top:  0;
  left:  0;
  width:  100%;
  height:  100%;
}

.black {
  background-color: black;
}

.white {
  background-color: white;
}
</style>