import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';
import "lib-flexible/flexible"
import axios from 'axios'

import './assets/iconfont/font_2394605_okeixit5bna/iconfont.css'
let app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(store)
app.use(router)
app.use(Vant)
app.mount('#app')