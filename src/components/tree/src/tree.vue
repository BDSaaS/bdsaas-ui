<template>
  <ul>
    <li v-for="item of $props.treeData" :key="item.key">
      <b-icon class="red" name="arrow-right-bold" />
      <span>{{ item.title }}</span>
      <BTree v-if="item.children?.length" :tree-data="item.children" />
    </li>
  </ul>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Key, TreeNode } from './interface'
import BIcon from '@/components/icon/src/icon.vue'

export default defineComponent({
  name: 'BTree',
  components: { BIcon },
  props: {
    // 点击节点本身的选中
    selectedKeys: {
      type: Array as PropType<Key[]>
    },
    // 是否开启多选（只针对点击节点本身的多选）
    multiple: {
      type: Boolean as PropType<boolean>
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
    // 数据
    treeData: {
      type: Array as PropType<TreeNode[]>,
      required: true
    }
  },
  emits: ['update:selectedKeys', 'update:checkedKeys', 'update:expandedKeys'],
  setup() {
    const h1 = 'Tree 组件'

    return {
      h1
    }
  }
})
</script>

<style lang="less">
@import "../style/tree";
</style>
