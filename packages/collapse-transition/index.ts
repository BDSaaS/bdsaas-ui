import type { App } from 'vue'
import CollapseTransition from './src/collapse-transition.vue'

CollapseTransition.install = (app: App): void => {
  app.component(CollapseTransition.name, CollapseTransition)
}
export default CollapseTransition
