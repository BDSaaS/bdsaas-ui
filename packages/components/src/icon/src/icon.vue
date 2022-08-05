<template>
  <svg class="b-icon" aria-hidden="true" width="1em" height="1em">
    <use :href="'#b-icon-' + name"/>
  </svg>
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
