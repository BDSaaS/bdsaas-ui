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
        <!--      TODO Tree 的 checkAble 属性优先，再根据独立节点的 checkAble 属性-->
        <!--        <b-checkbox v-if="$props.treeNodeData.checkAble" />-->
        <b-checkbox
          v-model="$props.treeNodeData.checked"
          class="b-tree-node-checkbox"
          @click.stop
        />
        <!--      TODO 根据 Tree 的 show-icon 属性，判断显示，有插槽默认值以及定制图标-->
        <span class="b-tree-node-inner">
          <slot name="icon">
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
        />
      </ul>
    </collapse-transition>
  </li>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { TreeNode } from '@/components/tree/src/interface'
import BIcon from '@/components/icon/src/icon.vue'
import BCheckbox from '@/components/checkbox/src/checkbox.vue'
import CollapseTransition from '@/components/collapse-transition/src/collapse-transition.vue'
import { injectMore } from '@tools/utils/vue-utils'
import {
  useSetSelectedKeys,
  useSingleSelect
} from '@/components/tree/src/hooks/useSelect'

export default defineComponent({
  name: 'tree-node',
  components: { CollapseTransition, BCheckbox, BIcon },
  props: {
    treeNodeData: {
      type: Object as PropType<TreeNode>,
      required: true
    }
  },
  setup(props) {
    const { treeNodeData } = toRefs(props)
    const {
      currentSelectedIndex,
      multiple,
      treeDataCache,
      selectedKeys,
      updateSelectedKeys
    } = injectMore([
      'currentSelectedIndex',
      'multiple',
      'treeDataCache',
      'selectedKeys',
      'updateSelectedKeys'
    ])

    const hasLeaf = computed(
      () => (unref(treeNodeData).children as TreeNode[])?.length > 0
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
      /**
       * 点击子节点本身进行选中，可取消选中（有选中状态）
       * 点击子节点本身进行选中，点击其他行取消选中（有选中状态）
       */
      if (!multiple.value) {
        const prevIndex = currentSelectedIndex.value as string
        const currentIndex = unref(treeNodeData).currentIndex as string
        currentSelectedIndex.value = currentIndex

        if (Object.is(prevIndex, currentIndex)) {
          setNodeSelected()
        } else {
          useSingleSelect({
            prevIndex,
            currentIndex,
            treeData: unref(treeDataCache) as TreeNode[]
          })
        }
      } else {
        setNodeSelected()
      }

      unref(updateSelectedKeys)(
        useSetSelectedKeys({
          multiple: multiple.value,
          selectedKeys: toRaw(unref(selectedKeys)),
          selectedKey: unref(treeNodeData).key,
          selected: toRaw(unref(treeNodeData)).selected as boolean
        })
      )
    }

    function expandNode() {
      unref(treeNodeData).isExpanded = !unref(treeNodeData).isExpanded
    }

    return {
      hasLeaf,
      labelClass,
      switchClass,
      clickNode,
      expandNode
    }
  }
})
</script>
