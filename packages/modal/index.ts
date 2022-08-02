import type { App } from 'vue'
import Modal from './src/modal.vue'

Modal.install = (app: App): void => {
  app.component(Modal.name, Modal)
}
export default Modal
