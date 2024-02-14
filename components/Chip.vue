<template>
  <div :style="{ backgroundColor: color }" class="chip"></div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.chip {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
