# Tree 组件设计文档

1. 一层结构

- 点击子节点本身进行选中，可取消选中（有选中状态）√
- 点击子节点本身进行选中，点击其他行取消选中（有选中状态）√
- 可初始传入选中值，双向绑定（v-model:selectedKeys）√
- 一层结构的多选功能（multiple）√
- 节点前添加 Checkbox 复选框（checkAble）（v-model:checkedKeys）90%
- 控制复选框显示（checkAble）√
- 控制图标显示（showIcon）√

2. 多层结构

- 继承一层结构所有功能
- Checkbox 复选框的多选功能

3. 高级功能

- 默认展开所有树节点功能（defaultExpandAll）√
- 展开指定的树节点（v-model:expandedKeys）
- 图标自定义
- 右键菜单
- 加入线（showLine）
- 拖动
