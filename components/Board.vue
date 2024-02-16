<script lang="ts">
const props = defineComponent({
	size: {
		type: Number,
		default: 9,
	},
});
</script>

<template>
	<div>
    <div v-for="(row, rowIndex) in gameBoard" :key="'row-' + rowIndex">
      <span
        class="tile"
        v-for="(tile, colIndex) in row"
        :key="'tile-' + rowIndex + '-' + colIndex"
      >
        {{ tile }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
