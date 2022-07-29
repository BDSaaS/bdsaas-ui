export type Key = string | number

export interface TreeNode {
  class?: string // 节点的 class
  disabled?: boolean // 禁掉响应
  icon?: string // 自定义图标。可接收 BIcon 组件的 name
  imgUrl?: string // 自定义图片，优先级高于自定义图标
  key: string | number // 节点唯一标识
  checkAble?: boolean // 当树为 checkAble 时，设置独立节点是否展示 Checkbox
  selectAble?: boolean // 设置节点是否可被选中
  selected?: boolean // 目前组件内使用，用于选中一行（该值组件生成）
  checked?: boolean // 目前组件内使用，用于选中一行的 checkbox（该值组件生成）
  indeterminate?: boolean // 目前组件内使用，用于 checkbox 的半选中状态（当其下属的 checkbox 没有全部选中时为 true）（该值组件生成）
  isExpanded?: boolean // 目前组件内使用，用于展开一行树节点的 children（该值组件生成）
  currentIndex?: string // 目前组件内使用，用于获取节点当前索引（该值组件生成）
  initialSelected?: boolean // 目前组件内使用，单选情况下，将当前选中的 key 的 currentIndex 置为 prevIndex 的标志（该值组件生成）
  title: string // 节点的文本
  children?: TreeNode[]
}
