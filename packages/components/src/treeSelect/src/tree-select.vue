<template>
  <div class="b-tree-select">
    <basic-select :selectItems="selectOrCheckItems">
      <BTree
          ref="tree"
          v-model:selected-keys="selectedKeysCache"
          v-model:checked-keys="checkedKeysCache"
          :tree-data="$props.treeData"
          :showIcon="$props.showIcon"
          :default-expand-all="$props.defaultExpandAll"
          :wrapper-class="$props.wrapperClass"
          :checkAble="$props.checkAble"
          :disabled-selected="$props.checkAble"
          multiple
          @select="selectHandler"
          @check="checkHandler"
      />
    </basic-select>
  </div>
</template>

<script lang="ts">
import "../style/index.less"
import {defineComponent} from 'vue'
import BasicSelect from '../../basicSelect/src/basic-select.vue'
import BTree from '../../tree/src/tree.vue'
import type {PropType} from 'vue'
import {Key, SelectedItem, TreeNode as ITreeNode} from '../types'
import {getRaw} from "../../utils/vue-utils"

export default defineComponent({
  name: 'BTreeSelect',
  components: {BTree, BasicSelect},
  props: {
    // 点击节点本身的选中
    selectedKeys: {
      type: Array as PropType<Key[]>,
      default: () => []
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
  emits: ['update:selectedKeys', 'update:checkedKeys'],
  setup(props, {emit}) {
    const {selectedKeys, checkedKeys} = toRefs(props)
    const selectedKeysCache = ref(getRaw(selectedKeys))
    const checkedKeysCache = ref(getRaw(checkedKeys))
    const selectItems = ref<SelectedItem[]>([])
    const checkItems = ref<SelectedItem[]>([])
    const selectOrCheckItems = computed(() => {
      if (selectedKeys?.value?.length) {
        return selectItems.value
      } else if (checkItems?.value?.length) {
        return checkItems.value
      }
      return []
    })
    const tree = ref()

    onMounted(() => {
      selectItems.value = unref(tree).getSelectedOrCheckedKeys(getRaw(selectedKeys) || [])
      checkItems.value = unref(tree).getSelectedOrCheckedKeys(getRaw(checkedKeys) || [])
    })

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
        }
    )

    watch(
        () => checkedKeysCache.value,
        val => {
          emit('update:checkedKeys', val)
        }
    )

    function selectHandler(val: SelectedItem[]) {
      selectItems.value = val
    }

    function checkHandler(val: SelectedItem[]) {
      checkItems.value = val
      console.log(val, 'line 99 99 99 99 99 99 99 99 99')
    }

    return {
      tree,
      selectOrCheckItems,
      selectedKeysCache,
      checkedKeysCache,
      selectHandler,
      checkHandler
    }
  }
})
</script>
