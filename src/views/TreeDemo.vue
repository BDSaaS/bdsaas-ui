<template>
  <div style="width: 500px; margin: 0 auto;">
    <BTree :tree-data="treeData" wrapper-class="test-tree" />
  </div>
</template>

<script setup lang="ts">
import BTree from '@/components/tree/src/tree.vue'
import { TreeNode } from '@/components/tree/src/interface'
import { Ref } from 'vue'

const treeData = ref([
  {
    title: '父节点-1',
    key: '0-0',
    selected: false,
    isExpanded: false,
    checked: false,
    children: [
      {
        title: '父节点-1-1',
        key: '0-1-1',
        selected: false,
        isExpanded: false,
        checked: false,
        children: [
          {
            title: '父节点-1-1-1',
            key: '0-1-1-1',
            selected: false,
            isExpanded: false,
            checked: false,
            checkAble: false
          }
        ]
      },
      {
        title: '父节点-1-2',
        key: '0-1-2',
        selected: false,
        isExpanded: false,
        checked: false,
        children: [
          {
            title: '父节点-1-1-2',
            key: '0-1-1-2',
            selected: false,
            isExpanded: false,
            checked: false,
            checkAble: false
          }
        ]
      }
    ]
  },
  {
    title: 'parent 2',
    key: '0-1',
    checked: false
  }
]) as Ref<TreeNode[]>
</script>
