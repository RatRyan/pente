<script lang="ts">
import type Space from "./Space.vue";

const props = defineComponent({
	size: {
		type: Number,
		default: 9,
	},
});

</script>

<template>
	<!-- <div class="grid">
		<div v-for="(row, rowIndex) in grid" :key="'row-' + rowIndex" class="row">
			<Space
				v-for="(cell, cellIndex) in row"
				:key="'cell-' + rowIndex + '-' + cellIndex"
				:player="getPlayerForCell(rowIndex, cellIndex)"
			/>
		</div>
	</div> -->
</template>

<style scoped></style>
