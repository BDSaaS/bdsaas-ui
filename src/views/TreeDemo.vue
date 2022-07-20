<template>
  <div style="width: 500px; margin: 0 auto;">
    <BTree :tree-data="treeData" wrapper-class="test-tree" />
  </div>
  <hr />
  <div>
    {{ treeData }}
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
    title: 'parent 2',
    key: '0-1'
  }
]) as Ref<TreeNode[]>
</script>
