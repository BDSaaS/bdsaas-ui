import type { App } from 'vue'
import Tooltip from './src/tooltip.vue'
Tooltip.install = (app: App): void => {
  app.component(Tooltip.name, Tooltip)
}
export default Tooltip
