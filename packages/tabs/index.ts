import type { App } from 'vue'
import Tabs from './src/tabs.vue'
import TabPane from './src/tab-pane.vue'

Tabs.install = (app: App): void => {
  app.component(Tabs.name, Tabs)
}
TabPane.install = (app: App): void => {
  app.component(TabPane.name, TabPane)
}
export { TabPane }

export default Tabs
