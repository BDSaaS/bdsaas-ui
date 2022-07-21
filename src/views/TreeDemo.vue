<template>
  <div style="width: 500px; margin: 0 auto;">
    <h2>节点单选</h2>
    <BTree :tree-data="treeData" wrapper-class="test-tree" />
    <h2>节点多选</h2>
    <BTree :tree-data="treeData2" multiple wrapper-class="test-tree" />
  </div>
</template>

<script setup lang="ts">
import BTree from '@/components/tree/src/tree.vue'
import { TreeNode } from '@/components/tree/src/interface'
import { Ref } from 'vue'

const testData = [
  {
    title: '父节点-1',
    key: '0-0'
  },
  {
    title: 'parent 2',
    key: '0-1'
  }
]
const testData2 = [
  {
    title: '父节点-1',
    key: '0-0',
    children: [
      {
        title: '父节点-1-1',
        key: '0-1-1',
        children: [
          {
            title: '父节点-1-1-1',
            key: '0-1-1-1',
            checkAble: false
          }
        ]
      },
      {
        title: '父节点-1-2',
        key: '0-1-2',
        children: [
          {
            title: '父节点-1-1-2',
            key: '0-1-1-2',
            checkAble: false
          }
        ]
      }
    ]
  },
  {
    title: '父节点-2',
    key: '0-1'
  }
]

const treeData = ref(testData) as Ref<TreeNode[]>
const treeData2 = ref(testData2) as Ref<TreeNode[]>
</script>
