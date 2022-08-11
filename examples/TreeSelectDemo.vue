<template>
  <div style="display: flex; flex-direction: column; align-items: center; height: 500px;">
    <b-tree-select
        v-model:selected-keys="selectedKeys"
        :tree-data="treeData"
        show-icon
        check-able
        default-expand-all
    />
    <br/>
    <br/>
    {{ selectedKeys }}
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from 'vue'

const testData3 = [
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
const treeData = ref(testData3) as Ref<any[]>
const selectedKeys: Ref<string[]> = ref(['0'])
</script>
