export type Key = string | number

export interface TreeNode {
  class?: string // 节点的 class
  disabled?: boolean // 禁掉响应
  icon?: boolean // 自定义图标。可接收组件，props 为当前节点 props
  key: string | number // 节点唯一标识
  checkAble?: boolean // 当树为 checkAble 时，设置独立节点是否展示 Checkbox
  selectAble?: boolean // 设置节点是否可被选中
  title: string // 节点的文本
  children?: TreeNode[]
}
