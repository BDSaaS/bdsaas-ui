import { Ref } from 'vue'
import { TreeNode } from '@/components/tree/src/interface'
import { isArray } from '@tools/utils/is'
import {
  getIndexList,
  getTreeNode
} from '@/components/tree/src/hooks/useHandleSelect'

type Params = {
  treeData: Ref<TreeNode[]>
  currentTreeNode: Ref<TreeNode>
  checked: boolean
}

function getParentIndex(currentIndex: string): string {
  const indexList = currentIndex.split('-')
  const parentIndex =
    indexList.length > 1
      ? indexList.length-- && indexList.join('-')
      : indexList.join('-')
  // Fixme TS2322: Type 'string | 0' is not assignable to type 'string'.（！！！待排查）
  return parentIndex as string
}

// 选中/取消选中底下的子节点
function handleChildrenChecked(
  currentTreeNode: Ref<TreeNode>,
  checked: boolean
) {
  const treeNode = unref(currentTreeNode)
  if (isArray(treeNode.children)) {
    ;(treeNode.children as TreeNode[]).forEach(item => {
      item.checked = checked
    })
  }
}

// 选中/取消选中上面的父节点
function handleParentChecked(
  treeData: Ref<TreeNode[]>,
  treeNodeData: Ref<TreeNode>
) {
  const parent = getTreeNode(
    unref(treeData) as TreeNode[],
    getIndexList(getParentIndex(unref(treeNodeData).currentIndex as string))
  )
  unref(parent).checked = (parent.children ?? [])?.every(item => !!item.checked)
}

// fixme 无父节点和子节点的单一节点选中有 bug
export function useHandleCheckbox({
  treeData,
  currentTreeNode,
  checked
}: Params) {
  handleChildrenChecked(currentTreeNode, checked)
  handleParentChecked(treeData, currentTreeNode)
}
