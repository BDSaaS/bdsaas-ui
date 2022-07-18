<template>
  <div>{{ h1 }}</div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'BTree',
  props: {},
  setup() {
    const h1 = 'Tree 组件'

    return {
      h1
    }
  }
})
</script>

<style lang="less">
@import "../style/tree";
</style>
