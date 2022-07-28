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
export function handleChildrenChecked(
  currentTreeNode: Ref<TreeNode>,
  checked: boolean
) {
  const treeNode = unref(currentTreeNode)
  if (isArray(treeNode.children)) {
    ;(treeNode.children as TreeNode[]).forEach(item => {
      item.checked = checked
      item.indeterminate = false
    })
  } /*else {
    console.log('该节点没有 children', treeNode.title)
  }*/
}

// 选中|取消选中|半选中上面的父节点
export function handleParentChecked(
  treeData: Ref<TreeNode[]>,
  treeNodeData: Ref<TreeNode>
) {
  const currentIndex = unref(treeNodeData).currentIndex as string
  const parentIndex = getParentIndex(currentIndex)
  // 该节点是一级子节点，没有 parent
  if (currentIndex === parentIndex) {
    return
  }
  const parent = getTreeNode(
    unref(treeData) as TreeNode[],
    getIndexList(parentIndex)
  )

  if (isArray(parent.children)) {
    const length = parent.children.length
    const checkedLength = parent.children.filter(item => !!item.checked).length
    const indeterminateLength = parent.children.filter(
      item => !!item.indeterminate
    ).length
    if (checkedLength === length) {
      // 底下 checkbox 全选中
      !unref(parent).checked && (unref(parent).checked = true)
      unref(parent).indeterminate = false
    } else if (checkedLength > 0 && checkedLength < length) {
      // 底下 checkbox 部分选中
      unref(parent).checked && (unref(parent).checked = false)
      unref(parent).indeterminate = true
    } else if (checkedLength === 0) {
      // 底下 checkbox 全部未选中
      unref(parent).checked && (unref(parent).checked = false)
      unref(parent).indeterminate = indeterminateLength > 0
    }
  }
}
