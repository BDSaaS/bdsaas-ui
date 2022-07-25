import { Key, TreeNode } from '@/components/tree/src/interface'

type Params = {
  prevIndex: string
  currentSelectedTreeNode: TreeNode
  treeData: TreeNode[]
}
type Params2 = {
  multiple: boolean
  selectedKeys: Key[]
  selectedKey: Key
  selected: boolean
}

export function getTreeNode(
  treeData: TreeNode[],
  index: number[],
  childKey: 'children' = 'children'
): TreeNode {
  const item = treeData[index[0]]
  if (item[childKey] && item[childKey]?.length && index.length > 1) {
    return getTreeNode(item[childKey] as TreeNode[], index.splice(1))
  } else {
    return item
  }
}

export function getIndexList(indexString: string): number[] {
  return indexString.split('-').map(Number)
}

export function useSingleSelect({
  prevIndex,
  treeData,
  currentSelectedTreeNode
}: Params) {
  const prevSelectedTreeNode = getTreeNode(treeData, getIndexList(prevIndex))
  prevSelectedTreeNode.selected = false
  currentSelectedTreeNode.selected = true
}

export function useSetSelectedKeys({
  multiple,
  selectedKeys,
  selectedKey,
  selected
}: Params2): Key[] {
  if (selected) {
    if (multiple) {
      selectedKeys.push(selectedKey)
      selectedKeys = [...new Set(selectedKeys)]
    } else {
      selectedKeys = [selectedKey]
    }
  } else {
    if (multiple) {
      const index = selectedKeys.findIndex(key => key === selectedKey)
      selectedKeys.splice(index, 1)
      /*☀️☀️☀️☀️☀️☀️*/
      selectedKeys = [...new Set(selectedKeys)]
    } else {
      selectedKeys = []
    }
  }
  return selectedKeys
}
