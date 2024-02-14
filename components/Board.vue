<script lang="ts">
defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});

export default {
	name: "Board",
};
</script>

<template>
	<div class="board"></div>
</template>

<style scoped>
.board {
  
}
</style>
