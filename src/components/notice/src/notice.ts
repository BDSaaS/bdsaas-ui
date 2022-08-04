import { createVNode, render } from 'vue'
import notice from './notice.vue'

// options: type：类型, text：描述,zIndex: 层级, duration：动画时间,offsetTop: 距离窗口顶部距离, showClose:是否显示关闭按钮, center: 文字是否居中
interface defaultOptionsInter {
  type?: string
  title: string
  message: string
  zIndex?: number
  duration?: number
  offsetTop?: number
  showClose?: boolean
  position?: string
  onClose?: closeInterface
}
interface closeInterface {
  (): void
}

class Notice {
  static instances: Array<any> = []
  static handle(options: defaultOptionsInter) {
    const {
      type = '',
      title = '',
      message = '',
      zIndex = 1,
      offsetTop = 50,
      duration = 3000,
      showClose = false
    } = options
    const containerDom = document.createElement('div')
    const noticeId = `b-notice-${new Date().getTime()}`
    const nodeDom = createVNode(notice, {
      id: noticeId,
      class: `b-notice-${type}`,
      type: type,
      title: title,
      zIndex: zIndex,
      message: message,
      showClose: showClose
    })
    render(nodeDom, containerDom)
    if (containerDom.firstElementChild) {
      this.instances.push(nodeDom.el)
      document.body.appendChild(containerDom.firstElementChild)
    }
    Notice.setTop(this.instances.at(-1), offsetTop)
    Notice.show(this.instances.at(-1))
    Notice.hide(this.instances.at(-1), offsetTop, duration)
  }
  // 显示message
  static show(dom: HTMLDivElement) {
    setTimeout(() => {
      dom.classList.remove('b-notice-hide')
    }, 200)
  }
  // 隐藏
  static hide(dom: HTMLDivElement, offsetTop: number, duration: number) {
    return setTimeout(() => {
      dom.style.top = offsetTop + 'px'
      dom.classList.add('b-notice-transition')
      dom.classList.add('b-notice-hide')
      setTimeout(() => {
        const index = Notice.instances.findIndex(item => item.id === dom.id)
        Notice.instances.splice(index, 1)
        if (document.body) document.body.removeChild(dom)
        for (const i in Notice.instances)
          this.setTop(Notice.instances[i], offsetTop)
      }, 50)
    }, duration)
  }
  // 设置message高度
  static setTop(dom: HTMLDivElement, offsetTop: number) {
    const prevDom: any = dom.previousElementSibling
    // 判断上一条提示框还在不在,默认给第一条加上初始offsetTop
    if (prevDom.classList.contains('b-notice')) {
      offsetTop = prevDom.offsetHeight + parseInt(prevDom.style.top)
    }
    dom.style.top = offsetTop + 20 + 'px'
  }
  /*  暂时不用，后期扩展  */
  static success(options: defaultOptionsInter) {
    Notice.handleType('success', options)
  }
  static info(options: defaultOptionsInter) {
    Notice.handleType('info', options)
  }
  static warn(options: defaultOptionsInter) {
    Notice.handleType('warn', options)
  }
  static error(options: defaultOptionsInter) {
    Notice.handleType('error', options)
  }
  static handleType(type: string, options: defaultOptionsInter) {
    Notice.handle(options)
  }
}
export default Notice
