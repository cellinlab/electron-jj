<template>
  <div class="left-bar">
    <div class="user-icon">
      <img src="../assets/avatar.png" alt="" />
    </div>
    <div class="menu">
      <router-link v-for="route in homeRoutes" :to="route.path"
        :class="['menu-item', { selected: route.isSelected }]">
        <i :class="[
            'iconfont',
            route.icon,
            { selected: route.isSelected },
          ]"></i>
      </router-link>
    </div>
    <div class="setting" @click="openSettingWindow">
      <div class="menu-item">
        <i class="iconfont icon-setting"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { createDialog } from '../common/Dialog'

const homeRoutes = ref([
  {
    path: '/home/chat',
    isSelected: true,
    icon: 'icon-chat',
    iconSelected: 'icon-chat',
  },
  {
    path: '/home/contact',
    isSelected: false,
    icon: 'icon-contact',
    iconSelected: 'icon-contact',
  },
  {
    path: '/home/collection',
    isSelected: false,
    icon: 'icon-collect',
    iconSelected: 'icon-collect',
  },
])
const route = useRoute()

watch(
  () => route,
  () =>
    homeRoutes.value.forEach((item) => {
      item.isSelected = item.path === route.fullPath
    }),
  {
    immediate: true,
    deep: true,
  }
)

const openSettingWindow = async () => {
  const config = {
    modal: true,
    width: 800,
    webPreferences: {
      webViewTag: false,
    },
  }
  const dialog = await createDialog('/setting/account', config)
  const msg = {
    msgName: 'FromOpenSetting',
    value: "Hello, I'm from open setting window!",
  }
  dialog.postMessage(msg)
}

window.addEventListener('message', (event) => {
  console.log('LeftBar receive message: ', event)
})
</script>

<style scoped lang="scss">
.left-bar {
  width: 54px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(46, 46, 46);
  -webkit-app-region: drag;
  .user-icon {
    height: 84px;
    padding-top: 36px;
    box-sizing: border-box;
    img {
      height: 34px;
      width: 34px;
      margin-left: 10px;
    }
  }
  .menu {
    flex: 1;
  }
  .menu-item {
    height: 44px;
    line-height: 44px;
    text-align: center;
    padding-left: 12px;
    padding-right: 12px;
    display: block;
    text-decoration: none;
    color: rgba(126, 126, 126);
    cursor: pointer;
    -webkit-app-region: no-drag;
    i {
      font-size: 22px;
    }
    &:hover {
      color: rgb(141, 141, 141);
    }
    .selected {
      color: rgb(7, 193, 96);
      &:hover {
        color: rgba(7, 193, 96, 0.8);
      }
    }
  }
  .setting {
    margin-bottom: 5px;
  }
}
</style>