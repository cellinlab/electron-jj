<template>
  <TopBar title="Setting" />
  <div class="setting-body">
    <div class="menu-box">
      <div class="menu-item">Account Setting</div>
      <div class="menu-item">Notification</div>
      <div class="menu-item">Normal</div>
      <div class="menu-item">File Management</div>
      <div class="menu-item">Shortcuts</div>
      <div class="menu-item">About</div>
    </div>
    <div class="page-box">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import TopBar from '../components/TopBar.vue'
import { dialogReady } from '../common/Dialog'

const msgHandler = () => {
  window.opener.postMessage({
    msgName: 'FromSetting',
    value: "Hello, I'm from setting window!",
  })
}

onMounted(() => {
  window.addEventListener('message', msgHandler)
  dialogReady()
})
</script>

<style scoped lang="scss">
.setting-box {
  display: flex;
  flex: 1;
  box-sizing: border-box;
  padding-top: 50px;
  .menu-box {
    width: 120px;
    border-right: 1px solid rgb(227, 227, 227);
    .menu-item {
      height: 32px;
      line-height: 32px;
      text-align: center;
    }
  }
}
.page-box {
  flex: 1;
}
</style>