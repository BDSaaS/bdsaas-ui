import type {IMessageParams} from '../type'
import MessageComponent from "./message1.vue";
import {createVNode, render, VNode} from "vue";
// 组装所有DOM
let vmArr: VNode[] = []
export const Message1 = (options: IMessageParams) => {
    if(typeof options === 'string') {
        options = {
            message: options
        }
    }
    // 保存用户的关闭回调
    const userClose = options.onClose
    // 处理offset
    let offset = options.offset || 20
    vmArr.forEach(vm => {
        offset += vm.el!.offsetHeight + 20
    })
    // 修改options
    const opts = {
        ...options,
        offset,
        onClose: () => {
            vmArr = vmArr.slice(1)
            userClose?.()
        }
    }
    const container = document.createElement('div')
    const vm = createVNode(MessageComponent, opts as any)
    // 绑定事件卸载组件
    vm.props!.onUninstall = () => {
        render(null, container)
    }
    render(vm, container)
    document.body.appendChild(container.firstElementChild!)
    vmArr.push(vm)
}

