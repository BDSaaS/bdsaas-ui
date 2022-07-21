import { TreeNode } from '@/components/tree/src/interface'

type Params = {
  prevIndex: string
  currentIndex: string
  treeData: TreeNode[]
}

function getTreeNode(
  treeData: TreeNode[],
  childKey: 'children' = 'children',
  index: number[]
): TreeNode {
  const item = treeData[index[0]]
  if (item[childKey] && item[childKey]?.length && index.length > 1) {
    return getTreeNode(item[childKey] as TreeNode[], childKey, index.splice(1))
  } else {
    return item
  }
}

function getIndexList(indexString: string): number[] {
  return indexString.split('-').map(Number)
}

export function singleSelect({ prevIndex, currentIndex, treeData }: Params) {
  const prevSelectedTreeNode = getTreeNode(
    treeData,
    'children',
    getIndexList(prevIndex)
  )
  const currentSelectedTreeNode = getTreeNode(
    treeData,
    'children',
    getIndexList(currentIndex)
  )
  prevSelectedTreeNode.selected = false
  currentSelectedTreeNode.selected = true
}
