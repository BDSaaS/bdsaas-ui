import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import BdUI from 'bdsaas-ui'
import 'bdsaas-ui/src/style/index.less'
import './assets/fonts/style.css'
createApp(App).use(router).use(BdUI).mount('#app')
