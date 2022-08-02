import type { App } from 'vue'
import BBadge from './src/BBadge.vue'

BBadge.install = (app: App): void => {
  app.component(BBadge.name, BBadge)
}
export default BBadge
