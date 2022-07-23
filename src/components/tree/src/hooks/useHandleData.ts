import { Ref } from 'vue'
import { Key, TreeNode } from '@/components/tree/src/interface'
import { isArray, isObject } from '@tools/utils/is'
import { cloneDeep } from 'lodash-es'

type Params = {
  treeData: TreeNode[]
  treeDataCache: Ref<TreeNode[]>
  selectedKeys: Key[]
  multiple: boolean
  currentSelectedIndex: Ref<string>
}

type Params2 = {
  target: TreeNode[]
  parentCurrentIndex?: string
  selectedKeys: Key[]
  multiple: boolean
  currentSelectedIndex: Ref<string>
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
  multiple,
  currentSelectedIndex
}: Params2): void {
  if (isArray(target) && target.length) {
    target.forEach((item, index) => {
      isObject(item) &&
        Object.assign(item, {
          selected: selectedKeys?.includes(item.key),
          isExpanded: false,
          checked: false,
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
          multiple,
          currentSelectedIndex
        })
    })
  }
}

/*初始化 treeData*/
export function useInitTreeData({
  treeData,
  treeDataCache,
  selectedKeys,
  multiple,
  currentSelectedIndex
}: Params) {
  const target = cloneDeep(treeData)
  treeDataInitHandle({
    target,
    selectedKeys: unref(selectedKeys),
    multiple,
    currentSelectedIndex
  })
  treeDataCache.value = target
}
