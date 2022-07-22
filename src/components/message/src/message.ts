// 引入css样式
import styles from '../style/message.less'
// 创建style标签,并填充css样式,将元素插到head里面
const styleHtml = document.createElement('style')
styleHtml.textContent = styles
document.head.appendChild(styleHtml)
// options: type：类型, text：描述,zIndex: 层级, duration：动画时间,offsetTop: 距离窗口顶部距离, showClose:是否显示关闭按钮, center: 文字是否居中
interface defaultOptionsInter {
  type?: string
  text?: string
  zIndex?: number | string
  duration?: number
  offsetTop?: number
  showClose?: boolean
  center?: boolean
  onClose?: closeInterface
}
type optionType = defaultOptionsInter | string
interface closeInterface {
  (): void
}
class Message {
  static instances: Array<any> = []
  static handle(options: defaultOptionsInter | string) {
    let flag = false
    let defaultOptions: defaultOptionsInter = {} // 默认值
    if (typeof options === 'string') {
      defaultOptions.text = options
    } else {
      defaultOptions = Object.assign(defaultOptions, options)
    }
    const {
      type = 'info',
      text = '',
      duration = 3000,
      zIndex = 99999999,
      offsetTop = 0,
      showClose = false,
      center = false,
      onClose
    } = defaultOptions
    const el: any = document.createElement('div')
    el.className = 'b-message b-message-opacity b-message-' + type
    ;(el.style as any).zIndex = zIndex
    el.id = 'b-' + new Date().getTime()
    this.instances.push(el)
    // 显示
    Message.showMessage(el)
    const p: HTMLParagraphElement = document.createElement('p')
    p.className = 'content'
    if (center) p.classList.add('center')
    el.appendChild(p)
    p.innerHTML = text
    if (showClose || !duration) {
      const span: HTMLSpanElement = document.createElement('span')
      span.className = 'icon'
      span.innerHTML =
        '<svg class="b-icon" aria-hidden="true" width="1em" height="1em"><use href="#b-icon-close" /></svg>'
      el.appendChild(span)
      span.onclick = function () {
        clearTimeout(el.timer)
        flag = true
        Message.hideMessage(el, 500, offsetTop, <closeInterface>onClose)
      }
    }
    document.body.appendChild(el)
    Message.setTop(this.instances.at(-1), offsetTop)
    if (duration) {
      // 判断当前延迟时间是否为0, 如果为0，则不自动消失。
      // 隐藏
      el.timer = Message.hideMessage(
        el,
        duration,
        offsetTop,
        <closeInterface>onClose
      )
      el.onmouseenter = function () {
        if (flag) return
        clearTimeout(el.timer)
      }
      el.onmouseleave = function () {
        if (flag) return
        el.timer = Message.hideMessage(
          el,
          duration,
          offsetTop,
          <closeInterface>onClose
        )
      }
    }
  }
  // 隐藏
  static hideMessage(
    dom: HTMLDivElement,
    duration: number,
    offsetTop: number,
    onClose: closeInterface
  ) {
    return setTimeout(() => {
      dom.style.top = offsetTop + 'px'
      dom.classList.add('b-message-opacity')
      if (typeof onClose === 'function') onClose()
      setTimeout(() => {
        const index = Message.instances.findIndex(item => item.id === dom.id)
        Message.instances.splice(index, 1)
        if (document.body) document.body.removeChild(dom)
        for (const i in Message.instances)
          this.setTop(Message.instances[i], offsetTop)
      }, 50)
    }, duration)
  }
  // 显示message
  static showMessage(dom: HTMLDivElement) {
    setTimeout(() => {
      dom.classList.remove('b-message-opacity')
    }, 200)
  }
  // 设置message高度
  static setTop(dom: any, offsetTop: number) {
    const prevDom = dom.previousElementSibling
    // 判断上一条提示框还在不在,默认给第一条加上初始offsetTop
    if (prevDom.classList.contains('b-message')) {
      offsetTop = parseInt(prevDom.style.top) + parseInt(prevDom.offsetHeight)
    }
    dom.style.top = offsetTop + 20 + 'px'
  }
  static success(options: optionType) {
    Message.handleType('success', options)
  }
  static info(options: optionType) {
    Message.handleType('info', options)
  }
  static warn(options: optionType) {
    Message.handleType('warn', options)
  }
  static error(options: optionType) {
    Message.handleType('error', options)
  }
  static handleType(type: string, options: optionType) {
    if (typeof options === 'string') {
      options = { text: options, type: type }
    } else {
      options.type = type
    }
    Message.handle(options)
  }
}
export default Message

// function setTop(dom: any, offsetTop: number) {
//   const prevDom = dom.previousElementSibling
//   // 判断上一条提示框还在不在,默认给第一条加上初始offsetTop
//   if (prevDom.classList.contains('b-message')) {
//     offsetTop = parseInt(prevDom.style.top) + parseInt(prevDom.offsetHeight)
//   }
//   dom.style.top = offsetTop + 20 + 'px'
// }
// // 隐藏
// function hideMessage(dom: HTMLDivElement, duration: number, offsetTop: number, onClose: closeInterface) {
//   return setTimeout(() => {
//     dom.style.top = offsetTop + 'px'
//     dom.classList.add('b-message-opacity')
//     if (typeof onClose === 'function') onClose()
//     setTimeout(() => {
//       const index = instances.findIndex((item) => item.id === dom.id)
//       instances.splice(index, 1)
//       if (document.body) document.body.removeChild(dom)
//       for (const i in instances) setTop(instances[i], offsetTop)
//     }, 50)
//   }, duration)
// }
// // 显示
// function showMessage(dom: HTMLDivElement) {
//   setTimeout(() => {
//     dom.classList.remove('b-message-opacity')
//   }, 200)
// }
// function message(options: defaultOptionsInter | string) {
//   let flag = false
//   let defaultOptions: defaultOptionsInter = {}// 默认值
//   if (typeof options === 'string') {
//     defaultOptions.text = options
//   } else {
//     defaultOptions = Object.assign(defaultOptions, options)
//   }
//   const { type = 'info', text = '', duration = 3000, zIndex = 99999999, offsetTop = 0, showClose = false, center = false,
//     onClose
//   } = defaultOptions
//   const el: any = document.createElement('div')
//   el.className = 'b-message b-message-opacity b-message-' + type;
//   (el.style as any).zIndex = zIndex
//   el.id = 'b-' + new Date().getTime()
//   instances.push(el)
//   // 显示
//   showMessage(el)
//   const p: HTMLParagraphElement = document.createElement('p')
//   p.className = 'content'
//   if (center) p.classList.add('center')
//   el.appendChild(p)
//   p.innerHTML = text
//   if (showClose || !duration) {
//     const span: HTMLSpanElement = document.createElement('span')
//     span.className = 'icon'
//     span.innerHTML = '<svg class="b-icon" aria-hidden="true" width="1em" height="1em"><use href="#b-icon-close" /></svg>'
//     el.appendChild(span)
//     span.onclick = function () {
//       clearTimeout(el.timer)
//       flag = true
//       hideMessage(el, 500, offsetTop, <closeInterface>onClose)
//     }
//   }
//   document.body.appendChild(el)
//   setTop(instances[instances.length - 1], offsetTop)
//   if (duration) { // 判断当前延迟时间是否为0, 如果为0，则不自动消失。
//     // 隐藏
//     el.timer = hideMessage(el, duration, offsetTop, <closeInterface>onClose)
//     el.onmouseenter = function () {
//       if (flag) return
//       clearTimeout(el.timer)
//     }
//     el.onmouseleave = function () {
//       if (flag) return
//       el.timer = hideMessage(el, duration, offsetTop, <closeInterface>onClose)
//     }
//   }
// }
// for (const i of typeMap) {
//   (message as any)[i] = function (options: defaultOptionsInter | string) {
//     if (typeof options === 'string') {
//       options = { text: options, type: i }
//     } else {
//       options.type = i
//     }
//     message(options)
//   }
// }
