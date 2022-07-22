import { Ref } from 'vue'
import { Key, TreeNode } from '@/components/tree/src/interface'
import { isArray, isObject } from '@tools/utils/is'
import { cloneDeep } from 'lodash-es'

type Params = {
  treeData: Ref<TreeNode[]>
  treeDataCache: Ref<TreeNode[]>
  selectedKeys: Ref<Key[]>
}

type Params2 = {
  target: TreeNode[]
  parentCurrentIndex?: string
  selectedKeys?: Key[]
}

/*递归给树数组子项加上当前索引*/
export function treeDataInitHandle({
  target,
  parentCurrentIndex,
  selectedKeys
}: Params2): void {
  if (isArray(target) && target.length) {
    target.forEach((item, index) => {
      isObject(item) &&
        Object.assign(item, {
          selected: selectedKeys?.includes(item.key),
          isExpanded: false,
          checked: false,
          selectIndex: index,
          currentIndex: parentCurrentIndex
            ? `${parentCurrentIndex}-${index}`
            : `${index}`
        })
      item.children &&
        treeDataInitHandle({
          target: item.children,
          parentCurrentIndex: item.currentIndex
        })
    })
  }
}

/*初始化 treeData*/
export function useInitTreeData({
  treeData,
  treeDataCache,
  selectedKeys
}: Params) {
  watchEffect(() => {
    const target = cloneDeep(toRaw(unref(treeData)))
    treeDataInitHandle({
      target,
      selectedKeys: unref(selectedKeys)
    })
    treeDataCache.value = target
  })
}
