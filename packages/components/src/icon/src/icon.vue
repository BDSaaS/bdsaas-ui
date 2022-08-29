<template>
  <span class="b-icon" :class="['b-icon-' + name]"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
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
