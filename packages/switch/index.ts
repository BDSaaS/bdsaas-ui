import type { App } from 'vue'
import BSwitch from './src/BSwitch.vue'

BSwitch.install = (app: App): void => {
  app.component(BSwitch.name, BSwitch)
}
export default BSwitch
