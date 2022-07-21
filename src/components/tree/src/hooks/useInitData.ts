import { Ref } from 'vue'
import { TreeNode } from '@/components/tree/src/interface'
import { isArray, isObject } from '@tools/utils/is'

export const treeDataCache = ref([]) as Ref<TreeNode[]>

/*递归给树数组子项加上当前索引*/
function treeDataInitHandle(
  target: TreeNode[],
  parentCurrentIndex?: string
): void {
  if (isArray(target) && target.length) {
    target.forEach((item, index) => {
      isObject(item) &&
        Object.assign(item, {
          selected: false,
          isExpanded: false,
          checked: false,
          selectIndex: index,
          currentIndex: parentCurrentIndex
            ? `${parentCurrentIndex}-${index}`
            : `${index}`
        })
      item.children && treeDataInitHandle(item.children, item.currentIndex)
    })
  }
}

/*初始化 treeData*/
export function useInitTreeData(treeData: TreeNode[]) {
  watchEffect(() => {
    treeDataCache.value = treeData
    treeDataInitHandle(treeDataCache.value)
  })
}
