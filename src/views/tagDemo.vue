<template>
  <div class="tag-main">
    <b-tag
      class="tag-item"
      v-for="(item, index) of list"
      :key="item"
      close-able
      @close="closeHandler(index)"
    >
      {{ item }}
    </b-tag>
  </div>
</template>

<script lang="ts" setup>
import BTag from '@/components/tag/src/tag.vue'

const list = ref(['小陈在吃饭', '小Z在吃饭', '小X在吃饭'])

function closeHandler(index: number) {
  list.value.splice(index, 1)
}
</script>

<style scoped>
.tag-main {
  margin: 100px 50px;
}

.tag-item {
  margin-right: 10px;
}
</style>
