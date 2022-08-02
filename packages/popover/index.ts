import type { App } from 'vue'
import Popover from './src/popover.vue'
Popover.install = (app: App): void => {
  app.component(Popover.name, Popover)
}
export default Popover
