<script lang="ts">
  import type {integer} from "vscode-languageserver-types";

  var board

  function defineBoard(size: integer){
    if(size % 2 != 0 && size >= 9 && size <= 39){
      board = [size, size]
    }

  }
</script>

<template>
	<div class="board"></div>
</template>

<style scoped>
</style>
