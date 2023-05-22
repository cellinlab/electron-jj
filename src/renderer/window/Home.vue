<template>
  <LeftBar />
  <div class="page-box">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { onMounted } from 'vue'

import LeftBar from '../components/LeftBar.vue'

onMounted(() => {
  ipcRenderer.send('showWindow')
})
</script>

<style scoped lang="scss">
.page-box {
  flex: 1;
  height: 100%;
  border-top: 1px solid #e6e6e6;
  box-sizing: border-box;
  display: flex;
  margin-top: -1px;
}
</style>