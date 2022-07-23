<template>
  <div style="display: flex; justify-content: center; margin: 0 auto;">
    <b-button
      :type="showIcon ? 'primary' : 'default'"
      size="small"
      @click="showIcon = !showIcon"
      >切换显示图标
    </b-button>
    <b-button
      :type="checkAble ? 'primary' : 'default'"
      size="small"
      @click="checkAble = !checkAble"
      >切换显示复选框
    </b-button>
    <!--    <b-button size="small" @click="checkAble = !checkAble">切换显示复选框</b-button>-->
  </div>
  <div style="display: flex; justify-content: center; margin: 0 auto;">
    <div class="tree-box">
      <h2>节点单选 selectedKeys：{{ selectedKeys }}</h2>
      <BTree
        v-model:selected-keys="selectedKeys"
        :tree-data="treeData"
        :showIcon="showIcon"
        :check-able="checkAble"
        wrapper-class="test-tree"
      />
    </div>
    <div class="tree-box">
      <h2>节点多选 selectedKeys：{{ selectedKeys2 }}</h2>
      <BTree
        v-model:selected-keys="selectedKeys2"
        :tree-data="treeData2"
        :showIcon="showIcon"
        :check-able="checkAble"
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
import { testData2, testData3 } from '@/components/tree/src/testData'
import BButton from '@/components/button/src/button.vue'

const testData = [
  {
    title: '节点-0',
    key: '0',
    children: [
      {
        title: '节点-0-0',
        key: '00'
      }
    ]
  },
  {
    title: '节点-1',
    key: '1'
  }
]

const treeData = ref(testData) as Ref<TreeNode[]>
const treeData2 = ref(testData3) as Ref<TreeNode[]>
const selectedKeys: Ref<string[]> = ref(['00'])
const selectedKeys2: Ref<string[]> = ref(['0'])
const showIcon = ref(false) as Ref<boolean>
const checkAble = ref(false) as Ref<boolean>
</script>

<style scoped>
.tree-box {
  width: 500px;

  /* height: 300px; */
  margin: 20px;
  overflow-y: auto;
}
</style>
