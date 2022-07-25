import { Ref } from 'vue'
import { Key, TreeNode } from '@/components/tree/src/interface'
import { isArray, isObject } from '@tools/utils/is'
import { cloneDeep } from 'lodash-es'

type Params = {
  treeData: TreeNode[]
  treeDataCache: Ref<TreeNode[]>
  selectedKeys: Key[]
  checkedKeys: Key[]
  multiple: boolean
  currentSelectedIndex: Ref<string>
  defaultExpandAll: boolean
}

type Params2 = {
  target: TreeNode[]
  parentCurrentIndex?: string
  selectedKeys: Key[]
  checkedKeys: Key[]
  multiple: boolean
  currentSelectedIndex: Ref<string>
  defaultExpandAll: boolean
  parentHasChecked?: boolean // 将父节点的选中状态作为参数传递，判断子节点是否被选中
}

function setInitialSelected(item: TreeNode, currentSelectedIndex: Ref<string>) {
  Object.assign(item, { initialSelected: true })
  currentSelectedIndex.value = item.currentIndex as string
}

/*treeData 数据初始化*/
export function treeDataInitHandle({
  target,
  parentCurrentIndex,
  selectedKeys,
  checkedKeys,
  multiple,
  currentSelectedIndex,
  defaultExpandAll,
  parentHasChecked
}: Params2): void {
  if (isArray(target) && target.length) {
    target.forEach((item, index) => {
      isObject(item) &&
        Object.assign(item, {
          selected: selectedKeys?.includes(item.key),
          isExpanded: defaultExpandAll,
          checked: !!parentHasChecked || checkedKeys?.includes(item.key),
          currentIndex: parentCurrentIndex
            ? `${parentCurrentIndex}-${index}`
            : `${index}`
        })

      // 单选情况下，将当前选中的 key 的 currentIndex 置为 prevIndex 的标志
      !multiple &&
        selectedKeys?.includes(item.key) &&
        setInitialSelected(item, currentSelectedIndex)

      item.children &&
        treeDataInitHandle({
          target: item.children,
          parentCurrentIndex: item.currentIndex,
          selectedKeys,
          checkedKeys,
          multiple,
          currentSelectedIndex,
          defaultExpandAll,
          parentHasChecked: !!item.checked
        })
    })
  }
}

/*初始化 treeData*/
export function useInitTreeData({
  treeData,
  treeDataCache,
  selectedKeys,
  checkedKeys,
  multiple,
  currentSelectedIndex,
  defaultExpandAll
}: Params) {
  const target = cloneDeep(treeData)
  treeDataInitHandle({
    target,
    selectedKeys: unref(selectedKeys),
    checkedKeys,
    multiple,
    currentSelectedIndex,
    defaultExpandAll
  })
  treeDataCache.value = target
}
