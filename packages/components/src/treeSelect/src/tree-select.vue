<template>
  <div class="b-tree-select">
    {{ selectedKeysCache }}
    <basic-select >
      <BTree
          v-model:selected-keys="selectedKeysCache"
          :tree-data="$props.treeData"
          :showIcon="showIcon"
          :default-expand-all="defaultExpandAll"
          :wrapper-class="wrapperClass"
          :checkAble="checkAble"
          multiple
      />
    </basic-select>
  </div>
</template>

<script lang="ts">
import "../style/index.less";
import {defineComponent} from 'vue'
import BasicSelect from '../../basicSelect/src/basic-select.vue'
import BTree from '../../tree/src/tree.vue'
import {PropType} from 'vue'
import {Key, TreeNode as ITreeNode} from '../types'

export default defineComponent({
  name: 'BTreeSelect',
  components: {BTree, BasicSelect},
  props: {
    // 点击节点本身的选中
    selectedKeys: {
      type: Array as PropType<Key[]>,
      required: true
    },
    // 是否开启多选（只针对点击节点本身的多选）
    multiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 点击复选框的选中
    checkedKeys: {
      type: Array as PropType<Key[]>,
      default: () => []
    },
    // 节点前添加 Checkbox 复选框
    checkAble: {
      type: Boolean as PropType<boolean>
    },
    // 是否默认展开所有树节点功能
    defaultExpandAll: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 显示图标
    showIcon: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 数据
    treeData: {
      type: Array as PropType<ITreeNode[]>,
      required: true
    },
    // 树最外层 class，用来自定义样式
    wrapperClass: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: ['update:selectedKeys'],
  setup(props, {emit}) {
    const {selectedKeys} = toRefs(props)
    const selectedKeysCache = ref(selectedKeys.value)

    watch(
        () => selectedKeys.value,
        val => {
          selectedKeysCache.value = val
          console.log('selectedKeys')
        }
    )

    watch(
        () => selectedKeysCache.value,
        val => {
          emit('update:selectedKeys', val)
          console.log('selectedKeysCache')
        }
    )

    return {
      selectedKeysCache
    }
  }
})
</script>
