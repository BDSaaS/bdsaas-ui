import {createVNode, render} from "vue";
import ConfirmComponent from "./confirm1.vue";
import { IConfirmParams } from '../type'
export const Confirm1 = (options: IConfirmParams) => {
    const container = document.createElement('div')
    const vm = createVNode(ConfirmComponent, options as any)
    return new Promise((resolve, reject) => {
        // 注册组件的方法
        vm.props!.onOk = () => {
            render(null, container)
            resolve(true)
        }
        vm.props!.onCancel = () => {
            render(null, container)
            reject(false)
        }
        render(vm, container)
        document.body.appendChild(container.firstElementChild!)
    })
}
