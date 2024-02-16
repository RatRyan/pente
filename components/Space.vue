<script setup lang="ts">
const props = defineProps({
	xPos: {
		type: Number,
		require: true,
	},
	yPos: {
		type: Number,
		require: true,
	},
});
const clicked = ref(false);
clicked.value = false;

function playerClick() {
	clicked.value = true;
}
</script>

<template>
	<button @click="playerClick()">
		<div v-if="clicked">
      
    </div>
	</button>
</template>

<style scoped>
.black,
.white,
.blank {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.black {
	background-color: black;
}

.white {
	background-color: white;
}
</style>
