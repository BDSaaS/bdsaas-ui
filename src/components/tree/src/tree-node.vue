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
import { PropType } from 'vue'
import { TreeNode } from '@/components/tree/src/interface'
import BIcon from '@/components/icon/src/icon.vue'
import BCheckbox from '@/components/checkbox/src/checkbox.vue'
import CollapseTransition from '@/components/collapse-transition/src/collapse-transition.vue'

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

    function clickNode() {
      unref(treeNodeData).selected = !unref(treeNodeData).selected
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
