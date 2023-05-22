<template>
  <template v-if="data.isInMsg">
    <div class="message-item left">
      <div class="avatar">
        <img :src="data.avatar" alt="">
      </div>
      <div class="msg-box">
        <div class="from-name">{{ data.fromName }}</div>
        <div class="msg-content">
          {{ data.messageContent }}
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="message-item right">
      <div class="msg-box">
        <div class="msg-content">
          {{ data.messageContent }}
        </div>
      </div>
      <div class="avatar">
        <img :src="data.avatar" alt="">
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ModelMessage } from '../../../../model/ModelMessage'
defineProps<{
  data: ModelMessage
}>()
</script>

<style scoped lang="scss">
.message-item {
  display: flex;
  padding-top: 8px;
  padding-bottom: 8px;
  position: relative;
  .avatar {
    width: 66px;
    text-align: center;
    img {
      width: 46px;
      height: 46px;
    }
  }
  .msg-box {
    flex: 1;
    .from-name {
      color: rgb(178, 178, 178);
      margin-bottom: 6px;
    }
    .msg-content {
      padding: 8px;
      border-radius: 3px;
      background: rgb(255, 255, 255);
      line-height: 22px;
    }
  }
}
.left {
  padding-right: 30%;
  &::after {
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid rgb(245, 245, 245);
    content: '';
    position: absolute;
    left: 60px;
    top: 38px;
  }
}
.right {
  padding-left: 30%;
  &::after {
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid rgb(245, 245, 245);
    content: '';
    position: absolute;
    right: 60px;
    top: 18px;
  }
  .msg-content {
    background: rgb(149, 236, 105) !important;
  }
}
</style>