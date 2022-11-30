import {App} from "vue";
import { Confirm1 } from "./src/confirm";
// 注册install方法
(Confirm1 as any).install = (app: App) => {
    // 兼容vue2
    app.config.globalProperties.$confirm = Confirm1
}

export default Confirm1
