import {createApp} from 'vue'
import App from './App.vue'
const app = createApp(App)
import BdUI from 'bdsaas-ui'
import 'bdsaas-ui/src/style/index.less';

app.use(BdUI)
app.mount('#app') 