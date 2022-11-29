import { Message1 } from './src/message'
import {App} from "vue";

(Message1 as any).install = (app: App):void => {
    // 兼容vue2
    app.config.globalProperties.$message = Message1
}
export default Message1
