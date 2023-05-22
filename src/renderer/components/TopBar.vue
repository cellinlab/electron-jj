<template>
  <div class="top-bar">
    <div class="win-title">{{ title }}</div>
    <div class="win-tool">
      <div @click="minimizeWindow">
        <i class="iconfont icon-minimize"></i>
      </div>
      <div v-if="isMaximized" @click="unmaximizeWindow">
        <i class="iconfont icon-restore"></i>
      </div>
      <div v-else @click="maximizeWindow">
        <i class="iconfont icon-maximize"></i>
      </div>
      <div @click="closeWindow">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { ipcRenderer } from 'electron'

defineProps<{
  title?: string
}>()
let isMaximized = ref(false)

const closeWindow = () => {
  ipcRenderer.invoke('closeWindow')
}
const maximizeWindow = () => {
  ipcRenderer.invoke('maximizeWindow')
}
const minimizeWindow = () => {
  ipcRenderer.invoke('minimizeWindow')
}
const unmaximizeWindow = () => {
  ipcRenderer.invoke('unmaximizeWindow')
}
const winMaximizeEvent = () => {
  isMaximized.value = true
}
const winUnmaximizeEvent = () => {
  isMaximized.value = false
}
onMounted(() => {
  ipcRenderer.on('winMaximize', winMaximizeEvent)
  ipcRenderer.on('winUnmaximize', winUnmaximizeEvent)
})
onUnmounted(() => {
  ipcRenderer.off('winMaximize', winMaximizeEvent)
  ipcRenderer.off('winUnmaximize', winUnmaximizeEvent)
})
</script>

<style scoped lang="scss">
.top-bar {
  display: flex;
  height: 25px;
  line-height: 25px;
  -webkit-app-region: drag;
  width: #888;
  .win-title {
    flex: 1;
    padding-left: 12px;
    font-size: 14px;
    color: #888;
  }
  .win-tool {
    height: 100%;
    display: flex;
    -webkit-app-region: no-drag;
    div {
      height: 100%;
      width: 34px;
      text-align: center;
      color: #999;
      cursor: pointer;
      line-height: 25px;
      &:hover {
        background: #efefef;
      }
      &:last-child:hover {
        background: #ff7875;
        i {
          color: #fff;
        }
      }
      i {
        font-size: 10px;
        color: #666666;
        font-weight: bold;
      }
    }
  }
}
</style>