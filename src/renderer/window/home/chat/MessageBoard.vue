<template>
  <div class="message-board">
    <TopBar title="Message Board" />
    <div class="message-list">
      <MessageItem v-for="item in messageStore.data" :key="item.id"
        :data="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from '../../../components/TopBar.vue'
import MessageItem from './MessageItem.vue'
import { useMessageStore } from '../../../store/useMessageStore'

const messageStore = useMessageStore()
</script>

<style scoped lang="scss">
.message-board {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  .message-list {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background: rgb(245, 245, 245);
  }
}
</style>