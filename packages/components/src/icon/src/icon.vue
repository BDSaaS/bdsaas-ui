<template>
  <span class="b-icon" :class="['b-icon-' + name]"></span>
</template>

<script lang="ts">
import "../style/index.less"
import {defineComponent, PropType} from 'vue'

export default defineComponent({
  name: 'BIcon',
  props: {
    name: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
<style scoped lang="less">
.b-icon {
  transition: all .3s linear;
}
</style>
