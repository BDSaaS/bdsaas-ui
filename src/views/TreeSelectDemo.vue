<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <b-tree-select
      v-model:selected-keys="selectedKeys"
      :tree-data="treeData"
      show-icon
      check-able
      default-expand-all
    />
    <br />
    <br />
    {{ selectedKeys }}
  </div>
</template>

<script setup lang="ts">
import BTreeSelect from '@/components/treeSelect/src/tree-select.vue'
import { testData3 } from '@/components/tree/src/testData'
import { Ref } from 'vue'
import { TreeNode } from '@/components/tree/src/interface'

const treeData = ref(testData3) as Ref<TreeNode[]>
const selectedKeys: Ref<string[]> = ref(['0'])
</script>
