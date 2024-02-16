<script setup lang="ts">
defineProps({
  color: String,
});
</script>

<template>
  <div :style="{ backgroundColor: color }" class="chip"></div>
</template>

<style scoped>
.chip {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
