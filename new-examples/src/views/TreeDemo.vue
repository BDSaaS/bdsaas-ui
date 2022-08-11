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
      <h2>
        节点多选<br/>
        selectedKeys：{{ selectedKeys2 }}<br/>
        checkedKeys：{{ checkedKeys }}
      </h2>
      <BTree
        v-model:selected-keys="selectedKeys2"
        v-model:checked-keys="checkedKeys"
        :tree-data="treeData2"
        :showIcon="showIcon"
        :check-able="checkAble"
        default-expand-all
        multiple
        wrapper-class="test-tree"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from 'vue'

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

const testData2 = [
  {
    title: '节点-0',
    key: '0',
    icon: 'notice',
    children: [
      {
        title: '节点-0-0',
        key: '00',
        imgUrl: 'https://avatars.githubusercontent.com/u/40376068?s=64&v=4',
        children: [
          {
            title: '节点-0-0-1',
            key: '001',
            children: [
              {
                title: '节点-0-0-1-1',
                key: '0011',
                children: [
                  {
                    title: '节点-0-0-1-1-1',
                    key: '00111'
                  },
                  {
                    title: '节点-0-0-2-1-1',
                    key: '00211'
                  }
                ]
              },
              {
                title: '节点-0-0-2-1',
                key: '0021'
              }
            ]
          },
          {
            title: '节点-0-0-2',
            key: '002'
          }
        ]
      },
      {
        title: '节点-0-1',
        key: '01',
        children: [
          {
            title: '节点-0-1-1',
            key: '011'
          },
          {
            title: '节点-0-1-2',
            key: '012'
          }
        ]
      }
    ]
  },
  {
    title: '节点-1',
    key: '1',
    children: [
      {
        title: '节点-1-0',
        key: '10',
        checkAble: false
      }
    ]
  },
  {
    title: '节点-2',
    key: '2',
    children: [
      {
        title: '节点-2-0',
        key: '20'
      },
      {
        title: '节点-2-1',
        key: '21'
      }
    ]
  },
  {
    title: '节点-3',
    key: '3'
  }
]

const treeData = ref(testData)
const treeData2 = ref(testData2)
const selectedKeys: Ref<string[]> = ref(['00'])
const selectedKeys2: Ref<string[]> = ref(['0', '3'])
const checkedKeys: Ref<string[]> = ref(['012', '00211'])
const showIcon = ref(true) as Ref<boolean>
const checkAble = ref(true) as Ref<boolean>
</script>

<style scoped>
.tree-box {
  width: 500px;

  /* height: 300px; */
  margin: 20px;
  overflow-y: auto;
}
</style>
