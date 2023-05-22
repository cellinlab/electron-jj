import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/style.css'
import './assets/icon/iconfont.css'
import App from './App.vue'

import { router } from './router'

import { db } from '../common/db'

db("Chat")
  .first()
  .then((res) => {
    console.log(res)
  })

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
