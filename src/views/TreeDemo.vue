<template>
  <div style="display: flex; justify-content: center;">
    <BTree :tree-data="treeData" />
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
    children: [
      {
        title: '父节点-1-1',
        key: '0-1-1',
        children: [
          {
            title: '父节点-1-1-1',
            key: '0-1-1-1'
          }
        ]
      }
    ]
  },
  {
    title: 'parent 2',
    key: '0-1'
  }
]) as Ref<TreeNode[]>
</script>
