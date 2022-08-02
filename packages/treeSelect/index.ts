import type { App } from 'vue'
import TreeSelect from './src/tree-select.vue'

TreeSelect.install = (app: App): void => {
  app.component(TreeSelect.name, TreeSelect)
}
export default TreeSelect
