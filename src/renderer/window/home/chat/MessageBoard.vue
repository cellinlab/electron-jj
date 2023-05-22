<template>
  <div class="message-board">
    <TopBar title="Message Board" />
    message board
  </div>
</template>

<script setup lang="ts">
import TopBar from '../../../components/TopBar.vue'
</script>

<style scoped lang="scss">
.message-board {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>