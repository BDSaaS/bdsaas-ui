<template>
  <li class="b-tree-node">
    <div class="b-tree-node-content">
      <b-icon class="b-tree-node-switch" name="arrow-right-bold" />
      <span class="b-tree-node-label">
        <!--      TODO Tree 的 checkAble 属性优先，再根据独立节点的 checkAble 属性-->
        <!--        <b-checkbox v-if="$props.treeNodeData.checkAble" />-->
        <b-checkbox />
        <!--      TODO 根据 Tree 的 show-icon 属性，判断显示，有插槽默认值以及定制图标-->
        <span class="b-tree-node-inner">
          <slot name="icon">
            <span class="b-tree-node-icon">
              <b-icon name="customer" />
            </span>
          </slot>
          <span class="b-tree-node-title">
            {{ $props.treeNodeData.key }}
            {{ $props.treeNodeData.title }}
          </span>
        </span>
      </span>
    </div>
    <ul v-if="showChildren" class="b-tree-node-children">
      <tree-node
        v-for="item of $props.treeNodeData.children"
        :key="item.key"
        :tree-node-data="item"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { TreeNode } from '@/components/tree/src/interface'
import BIcon from '@/components/icon/src/icon.vue'
import BCheckbox from '@/components/checkbox/src/checkbox.vue'

export default defineComponent({
  name: 'tree-node',
  components: { BCheckbox, BIcon },
  props: {
    treeNodeData: {
      type: Object as PropType<TreeNode>,
      required: true
    }
  },
  setup(props) {
    const showChildren = computed(
      () => (props.treeNodeData.children as TreeNode[])?.length > 0
    )

    return {
      showChildren
    }
  }
})
</script>
