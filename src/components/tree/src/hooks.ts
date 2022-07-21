import { Ref } from 'vue'
import { TreeNode } from '@/components/tree/src/interface'
import { handleArrData } from '@tools/handle-data'
import { isObject } from '@tools/is'

export const treeDataCache = ref([]) as Ref<TreeNode[]>

/*初始化 treeData*/
export function useInitTreeData(treeData: TreeNode[]) {
  watchEffect(() => {
    treeDataCache.value = treeData
    handleArrData(treeDataCache.value, 'children', item => {
      isObject(item) &&
        Object.assign(item, {
          selected: false,
          isExpanded: false,
          checked: false
        })
    })
  })
}
