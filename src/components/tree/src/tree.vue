<template>
  <ul :class="treeClass">
    <tree-node
      v-for="item of treeDataCache"
      :key="item.key"
      :tree-node-data="item"
    />
  </ul>
</template>

<script lang="ts">
import type { PropType, Ref } from 'vue'
import type { Key, TreeNode as ITreeNode } from './interface'
import TreeNode from '@/components/tree/src/tree-node.vue'
import { useInitTreeData } from './hooks/useInitData'
import { provideMore } from '@tools/utils/vue-utils'

export default defineComponent({
  name: 'BTree',
  components: { TreeNode },
  props: {
    // 点击节点本身的选中
    selectedKeys: {
      type: Array as PropType<Key[]>
    },
    // 是否开启多选（只针对点击节点本身的多选）
    multiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 点击复选框的选中
    checkedKeys: {
      type: Array as PropType<Key[]>
    },
    // 节点前添加 Checkbox 复选框
    checkAble: {
      type: Boolean as PropType<boolean>
    },
    // 是否默认展开所有树节点功能
    defaultExpandAll: {
      type: Boolean as PropType<boolean>
    },
    // 展开指定的树节点
    expandedKeys: {
      type: Array as PropType<Key[]>
    },
    // 加入线
    showLine: {
      type: Boolean as PropType<boolean>
    },
    // 显示图标
    showIcon: {
      type: Boolean as PropType<boolean>
    },
    // 数据
    treeData: {
      type: Array as PropType<ITreeNode[]>,
      required: true
    },
    // 树最外层 class，用来自定义样式
    wrapperClass: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: ['update:selectedKeys', 'update:checkedKeys', 'update:expandedKeys'],
  setup(props) {
    const { wrapperClass, treeData, multiple } = toRefs(props)
    const treeClass = computed(() => ['b-tree', unref(wrapperClass)])
    // 单选情况使用
    const currentSelectedIndex = ref<null | string>('')
    const treeDataCache = ref([]) as Ref<ITreeNode[]>

    useInitTreeData(treeData, treeDataCache)

    provideMore({
      currentSelectedIndex,
      multiple,
      treeDataCache
    })

    return {
      treeClass,
      treeDataCache
    }
  }
})
</script>

<style lang="less">
@import "../style/tree";
</style>
