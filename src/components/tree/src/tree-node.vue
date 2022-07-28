<template>
  <li class="b-tree-node">
    <div class="b-tree-node-content">
      <span :class="switchClass" @click="expandNode">
        <b-icon
          v-if="hasLeaf"
          class="b-tree-node-switch-icon"
          name="arrow-right-bold"
        />
      </span>
      <span :class="labelClass" @click="clickNode">
        <b-checkbox
          v-if="checkAble && $props.treeNodeData.checkAble !== false"
          v-model="$props.treeNodeData.checked"
          v-model:indeterminate="$props.treeNodeData.indeterminate"
          class="b-tree-node-checkbox"
          @change="checkHandler"
          @click.stop
        />
        <!--      TODO 根据 Tree 的 show-icon 属性，判断显示，有插槽默认值以及定制图标-->
        <span class="b-tree-node-inner">
          <slot v-if="showIcon" name="icon">
            <span class="b-tree-node-icon">
              <b-icon name="customer" />
            </span>
          </slot>
          <span class="b-tree-node-title">
            {{ $props.treeNodeData.title }}
          </span>
        </span>
      </span>
    </div>
    <collapse-transition>
      <ul
        v-if="hasLeaf && $props.treeNodeData.isExpanded"
        class="b-tree-node-children"
      >
        <tree-node
          v-for="item of $props.treeNodeData.children"
          :key="item.key"
          :tree-node-data="item"
          :checked-keys="$props.checkedKeys"
        />
      </ul>
    </collapse-transition>
  </li>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { TreeNode } from '@/components/tree/src/interface'
import { Key } from '@/components/tree/src/interface'
import BIcon from '@/components/icon/src/icon.vue'
import BCheckbox from '@/components/checkbox/src/checkbox.vue'
import CollapseTransition from '@/components/collapse-transition/src/collapse-transition.vue'
import { injectMore } from '@tools/utils/vue-utils'
import {
  useSetSelectedKeys,
  useSingleSelect
} from '@/components/tree/src/hooks/useHandleSelect'
import {
  handleChildrenChecked,
  handleParentChecked
} from '@/components/tree/src/hooks/useHandleCheck'

export default defineComponent({
  name: 'tree-node',
  components: { CollapseTransition, BCheckbox, BIcon },
  props: {
    treeNodeData: {
      type: Object as PropType<TreeNode>,
      required: true
    },
    // tree 的选中节点，这里用来进行初始的 checked 和 indeterminate 判断赋值
    checkedKeys: {
      type: Array as PropType<Key[]>,
      default: () => []
    }
  },
  setup(props) {
    // "tree 的选中节点，这里用来进行初始的 checked 和 indeterminate 判断赋值" 初始标记
    const isInitHandle = ref(true)
    const { treeNodeData, checkedKeys } = toRefs(props)
    const {
      currentSelectedIndex,
      multiple,
      treeDataCache,
      selectedKeys,
      updateSelectedKeys,
      updateCheckedKeys,
      checkAble,
      showIcon
    } = injectMore([
      'currentSelectedIndex',
      'multiple',
      'treeDataCache',
      'selectedKeys',
      'updateSelectedKeys',
      'updateCheckedKeys',
      'checkAble',
      'showIcon'
    ])

    // 递归初始化父节点 indeterminate
    watch(
      () => checkedKeys.value,
      () => {
        if (unref(isInitHandle) && treeNodeData.value.checked) {
          handleParentChecked(treeDataCache, treeNodeData)
        }
        isInitHandle.value = false
      }
    )

    // 点击复选框，递归更新子节点、父节点 checked、indeterminate
    watch(
      () => [treeNodeData.value.checked, treeNodeData.value.indeterminate],
      ([checked, indeterminate]) => {
        if ((checked && !indeterminate) || (!checked && !indeterminate)) {
          handleChildrenChecked(treeNodeData, !!checked)
        }

        if (checked || !checked || indeterminate) {
          handleParentChecked(treeDataCache, treeNodeData)
        }

        unref(updateCheckedKeys)(checked, treeNodeData.value.key)
      }
    )

    const hasLeaf = computed(
      () => (unref(treeNodeData).children as TreeNode[])?.length
    )

    const labelClass = computed(() => [
      'b-tree-node-label',
      unref(treeNodeData).selected && 'is-selected'
    ])

    const switchClass = computed(() => [
      'b-tree-node-switch',
      unref(treeNodeData).isExpanded && 'is-expanded'
    ])

    function setNodeSelected() {
      unref(treeNodeData).selected = !unref(treeNodeData).selected
    }

    function clickNode() {
      // Todo 待转成 hooks
      /*多选*/
      if (multiple.value) {
        setNodeSelected()
      } else {
        /*单选--点击子节点本身进行选中，可取消选中，可取消其他行选中（有选中状态）*/
        const prevIndex = currentSelectedIndex.value as string
        const currentIndex = unref(treeNodeData).currentIndex as string
        currentSelectedIndex.value = currentIndex

        if (Object.is(prevIndex, currentIndex)) {
          setNodeSelected()
        } else {
          useSingleSelect({
            prevIndex,
            currentSelectedTreeNode: unref(treeNodeData),
            treeData: unref(treeDataCache) as TreeNode[]
          })
        }
      }

      unref(updateSelectedKeys)(
        useSetSelectedKeys({
          multiple: multiple.value,
          selectedKeys: getRaw<Key[]>(selectedKeys),
          selectedKey: unref(treeNodeData).key,
          selected: getRaw(treeNodeData).selected as boolean
        })
      )
    }

    function expandNode() {
      unref(treeNodeData).isExpanded = !unref(treeNodeData).isExpanded
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function checkHandler(val: boolean) {
      /*暂时没用上，后续用*/
    }

    return {
      hasLeaf,
      checkAble,
      labelClass,
      switchClass,
      clickNode,
      expandNode,
      checkHandler,
      showIcon
    }
  }
})
</script>
