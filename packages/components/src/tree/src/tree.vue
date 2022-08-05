<template>
  <!--  {{ treeDataCache }}-->
  <!--  <hr />-->
  <ul :class="treeClass">
    <tree-node
        v-for="item of treeDataCache"
        :key="item.key"
        :tree-node-data="item"
        :checked-keys="$props.checkedKeys"
    />
  </ul>
</template>

<script lang="ts">
import "../style/index.less";
import type {PropType, Ref} from 'vue'
import {ref, defineComponent, computed, toRefs, unref} from 'vue'
import type {Key, TreeNode as ITreeNode} from '../types'
import TreeNode from './tree-node.vue'
import {useInitTreeData} from './hooks/useHandleData'
import {provideMore, getRaw} from '../../utils/vue-utils'

export default defineComponent({
  name: 'BTree',
  components: {TreeNode},
  props: {
    // 点击节点本身的选中（完成）
    selectedKeys: {
      type: Array as PropType<Key[]>,
      required: true
    },
    // 是否开启多选（只针对点击节点本身的多选）（完成）
    multiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 点击复选框的选中
    checkedKeys: {
      type: Array as PropType<Key[]>,
      default: () => []
    },
    // 节点前添加 Checkbox 复选框（完成）
    checkAble: {
      type: Boolean as PropType<boolean>
    },
    // 是否默认展开所有树节点功能（完成）
    defaultExpandAll: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 展开指定的树节点
    // expandedKeys: {
    //   type: Array as PropType<Key[]>
    // },
    // 加入线
    // showLine: {
    //   type: Boolean as PropType<boolean>
    // },
    // 显示图标（完成）
    showIcon: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 数据（完成）
    treeData: {
      type: Array as PropType<ITreeNode[]>,
      required: true
    },
    // 树最外层 class，用来自定义样式（完成）
    wrapperClass: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: [
    'update:selectedKeys',
    'update:checkedKeys',
    'update:expandedKeys',
    'select',
    'check'
  ],
  setup(props, {emit}) {
    const {
      wrapperClass,
      treeData,
      multiple,
      selectedKeys,
      checkAble,
      defaultExpandAll,
      showIcon,
      checkedKeys
    } = toRefs(props)
    const treeClass = computed(() => ['b-tree', unref(wrapperClass)])
    // 单选情况使用（传入 selectedKeys，将初始选中的那一项的索引作为 currentSelectedIndex 的初始值）
    const currentSelectedIndex = ref('')
    const treeDataCache = ref([]) as Ref<ITreeNode[]>

    function updateSelectedKeys(keys: Key[]) {
      emit('update:selectedKeys', keys)
    }

    function updateCheckedKeys(checked: boolean, key: Key) {
      let _checkedKeys = getRaw(checkedKeys)
      if (checked) {
        _checkedKeys.push(key)
      } else {
        const index = _checkedKeys.indexOf(key)
        index > -1 && _checkedKeys.splice(index, 1)
      }
      _checkedKeys = [...new Set(_checkedKeys)]
      emit('update:checkedKeys', _checkedKeys)
      return true
    }

    useInitTreeData({
      treeData: getRaw(treeData),
      treeDataCache,
      selectedKeys: getRaw(selectedKeys),
      checkedKeys: getRaw(checkedKeys),
      multiple: unref(multiple),
      currentSelectedIndex,
      defaultExpandAll: unref(defaultExpandAll),
      updateCheckedKeys
    })

    provideMore({
      currentSelectedIndex,
      multiple,
      treeDataCache,
      selectedKeys,
      updateSelectedKeys,
      updateCheckedKeys,
      checkAble,
      showIcon
    })

    return {
      treeClass,
      treeDataCache
    }
  }
})
</script>