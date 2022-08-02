import type { App } from 'vue'
import Confirm from './src/BConfirm.vue'

Confirm.install = (app: App): void => {
  app.component(Confirm.name, Confirm)
}
export default Confirm
