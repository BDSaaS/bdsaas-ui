<template>
  <div style="width: 500px; margin: 0 auto;">
    <h2>节点单选</h2>
    selectedKeys：{{ selectedKeys }}
    <div class="tree-box">
      <BTree
        v-model:selected-keys="selectedKeys"
        :tree-data="treeData"
        wrapper-class="test-tree"
      />
    </div>
    <h2>节点多选</h2>
    selectedKeys：{{ selectedKeys2 }}
    <div class="tree-box">
      <BTree
        v-model:selected-keys="selectedKeys2"
        :tree-data="treeData2"
        multiple
        wrapper-class="test-tree"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BTree from '@/components/tree/src/tree.vue'
import { TreeNode } from '@/components/tree/src/interface'
import { Ref } from 'vue'
import { testData2 } from '@/components/tree/src/testData'

const testData = [
  {
    title: '节点-0',
    key: '0',
    children: [
      {
        title: '节点-0-0',
        key: '00'
      },
      {
        title: '节点-0-1',
        key: '10'
      },
      {
        title: '节点-0-2',
        key: '20'
      },
      {
        title: '节点-0-3',
        key: '30'
      },
      {
        title: '节点-0-4',
        key: '40'
      }
    ]
  },
  {
    title: '节点-1',
    key: '1',
    children: [
      {
        title: '节点-1-0',
        key: '01'
      },
      {
        title: '节点-1-1',
        key: '11'
      },
      {
        title: '节点-1-2',
        key: '21'
      },
      {
        title: '节点-1-3',
        key: '31'
      },
      {
        title: '节点-1-4',
        key: '41'
      }
    ]
  }
]

const treeData = ref(testData) as Ref<TreeNode[]>
const treeData2 = ref(testData2) as Ref<TreeNode[]>
const selectedKeys: Ref<string[]> = ref(['0'])
const selectedKeys2: Ref<string[]> = ref(['1'])
</script>

<style scoped>
.tree-box {
  height: 300px;
  overflow-y: auto;
}
</style>
