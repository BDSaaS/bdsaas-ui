import type { App } from 'vue'
import List from './src/list.vue'

List.install = (app: App): void => {
  app.component(List.name, List)
}
export default List
