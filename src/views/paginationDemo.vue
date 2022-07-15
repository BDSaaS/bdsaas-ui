<template>
  <div class="b-pagination">
    <b-pagination
      :total="total"
      :pageSize="pageSize"
      :currentPage="currentPage"
      @change-page="changepage"
      @page-size-change="pageSizeChange"
    />
  </div>
</template>

<script lang="ts">
import { toRefs, defineComponent, reactive } from 'vue'
import { pageType } from '@/components/pagination/src/interface'
import BPagination from '@/components/pagination/src/BPagination.vue'
export default defineComponent({
  setup() {
    const data = reactive<pageType>({
      total: 100,
      pageSize: 10,
      currentPage: 1
    })
    const { total, pageSize, currentPage } = toRefs(data)
    function changepage(value: number) {
      currentPage.value = value
    }
    function pageSizeChange(val: number) {
      pageSize.value = val
    }
    return {
      total,
      pageSize,
      currentPage,
      changepage,
      pageSizeChange
    }
  },
  components: { BPagination }
})
</script>

<style scoped lang="less">
.b-pagination {
  margin: 100px 800px;
}
</style>
