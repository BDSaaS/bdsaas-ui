<template>
  <div class="b-pagination">
    <b-pagination
      :total="total"
      :pageSize="pageSize"
      :currentPage="currentPage"
    />
  </div>
</template>

<script setup lang="ts">
import BPagination from '@/components/pagination'
import { ref } from 'vue'
const total = ref(1)
const pageSize = ref(10)
const currentPage = ref(1)
</script>

<style scoped lang="less">
.b-pagination {
  margin: 100px 800px;
}
</style>
