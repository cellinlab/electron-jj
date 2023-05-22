<template>
  <div class="chat-list">
    <ChatSearch />
    <div class="list-box"></div>
  </div>
</template>

<script setup lang="ts">
import ChatSearch from './ChatSearch.vue'
</script>

<style scoped lang="scss">
.chat-list {
  width: 250px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .list-box {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    background: rgb(230, 229, 229);
    background-image: linear-gradient(
      to bottom right,
      rgb(235, 234, 233),
      rgb(240, 240, 240)
    );
    border-right: 1px solid rgb(214, 214, 214);
  }
}
</style>