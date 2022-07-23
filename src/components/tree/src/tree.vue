<template>
  {{ treeDataCache }}
  <hr />
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
import { useInitTreeData } from './hooks/useHandleData'
import { provideMore } from '@tools/utils/vue-utils'

export default defineComponent({
  name: 'BTree',
  components: { TreeNode },
  props: {
    // 点击节点本身的选中
    selectedKeys: {
      type: Array as PropType<Key[]>,
      required: true
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
  setup(props, { emit }) {
    const { wrapperClass, treeData, multiple, selectedKeys, checkAble } =
      toRefs(props)
    const treeClass = computed(() => ['b-tree', unref(wrapperClass)])
    // 单选情况使用（传入 selectedKeys，将初始选中的那一项的索引作为 currentSelectedIndex 的初始值）
    const currentSelectedIndex = ref('')
    const treeDataCache = ref([]) as Ref<ITreeNode[]>

    function updateSelectedKeys(keys: Key[]) {
      console.log(keys, 'line 75')
      // Fixme 节点多选有（值不对，收起） bug
      emit('update:selectedKeys', keys)
    }

    useInitTreeData({
      treeData: toRaw(unref(treeData)),
      treeDataCache,
      selectedKeys: toRaw(unref(selectedKeys)),
      multiple: toRaw(unref(multiple)),
      currentSelectedIndex
    })

    provideMore({
      currentSelectedIndex,
      multiple,
      treeDataCache,
      selectedKeys,
      updateSelectedKeys,
      checkAble
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
