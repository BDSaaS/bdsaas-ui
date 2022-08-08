<template>
  <span :class="['b-icon-' + name]"></span>
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
