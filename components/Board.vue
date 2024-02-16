<script lang="ts">
import type SpaceVue from "./Space.vue";
import type Space from "./Space.vue";

const props = defineComponent({
	size: {
		type: Number,
		default: 9,
	},
});
</script>

<template>
	<SpaceVue></SpaceVue>
</template>

<style scoped></style>
