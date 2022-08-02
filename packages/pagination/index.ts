import type { App } from 'vue'
import BPagination from './src/BPagination.vue'

BPagination.install = (app: App): void => {
  app.component(BPagination.name, BPagination)
}
export default BPagination
