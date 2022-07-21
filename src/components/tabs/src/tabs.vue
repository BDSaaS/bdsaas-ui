<template>
  <div class="b-tabs">
    <ul class="tabs clearfix">
      <li class="tab"><span class="tab-text">全部订单</span></li>
      <li class="tab"><span class="tab-text">待付款</span></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'BTabs',
  props: {
    type: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less">
@import "../style/index.less";
</style>
