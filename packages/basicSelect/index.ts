import type { App } from 'vue'
import BasicSelect from './src/basic-select.vue'

BasicSelect.install = (app: App): void => {
  app.component(BasicSelect.name, BasicSelect)
}
export default BasicSelect
