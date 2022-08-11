<template>
  <div class="button-box">
    <b-popover placement="top" :disabled="false" title="标题">
      <template #content>dvvsdfdsfdsf</template>
      <b-button style="width: 120px;">hover激活</b-button>
    </b-popover>
    <b-popover placement="right" trigger="click">
      <template #content>condlinessecondsecondlinessecond</template>
      <b-button style="width: 120px;">click激活</b-button>
    </b-popover>
    <b-popover placement="bottom" trigger="focus">
      <template #content>clinessecond</template>
      <b-button type="primary" style="width: 120px;">focus激活</b-button>
    </b-popover>
    <b-popover placement="top" trigger="manual">
      <template #content>condlinessecondlinesecondinessecond</template>
      <b-button type="primary" style="width: 120px;">手动激活</b-button>
    </b-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
  }
})
</script>

<style lang="less" scoped>
.button-box {
  display: flex;
  justify-content: space-between;
  width: 420px;
  margin: 0 auto;
}
</style>
