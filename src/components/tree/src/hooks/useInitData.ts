import { Ref } from 'vue'
import { TreeNode } from '@/components/tree/src/interface'
import { isArray, isObject } from '@tools/utils/is'
import { cloneDeep } from 'lodash-es'

// export const treeDataCache = ref([]) as Ref<TreeNode[]>

/*递归给树数组子项加上当前索引*/
export function treeDataInitHandle(
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
export function useInitTreeData(
  treeData: Ref<TreeNode[]>,
  treeDataCache: Ref<TreeNode[]>
) {
  watchEffect(() => {
    const cache = cloneDeep(toRaw(unref(treeData)))
    treeDataInitHandle(cache)
    treeDataCache.value = cache
  })
}
