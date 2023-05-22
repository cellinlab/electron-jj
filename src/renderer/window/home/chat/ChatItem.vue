<template>
  <div @click="itemClick(data)" :class="[
    'chat-item',
    { 'chat-item-selected': data.isSelected }
    ]">
    <div class="avatar">
      <img :src="data.avatar" alt="">
    </div>
    <div class="chat-info">
      <div class="from-name">{{ data.fromName }}</div>
      <div class="time-name">{{ data.sendTime }}</div>
    </div>
    <div class="row">
      <div class="last-msg">
        {{ data.lastMsg }}
      </div>
      <div class="subscribe"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModelChat } from '../../../../model/ModelChat'
import { useChatStore } from '../../../store/useChatStore'

defineProps<{
  data: ModelChat
}>()

const store = useChatStore()

const itemClick = (item: ModelChat) => {
  store.selectItem(item)
}
</script>

<style scoped lang="scss">
.chat-item {
  display: flex;
  height: 66px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: rgb(221, 219, 218);
  }
  .avatar {
    width: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 46px;
      height: 46px;
    }
  }
  .chat-info {
    flex: 1;
    height: 66px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .from-name {
      flex: 1;
    }
    .time-name {
      color: rgb(153, 153, 153);
      padding-right: 12px;
      font-size: 12px;
    }
  }
  .row {
    box-sizing: border-box;
    height: 28px;
    line-height: 28px;
    display: flex;
    .last-msg {
      color: rgb(153, 153, 153);
      flex: 1;
      font-size: 12px;
    }
  }
}
.chat-item-selected {
  background: rgb(196, 196, 196);
  &:hover {
    background: rgb(196, 196, 196);
  }
}
</style>