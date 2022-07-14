<template>
  <svg
    :class="['b-icon', $attrs.class]"
    :style="{
      width: size + 'px',
      height: size + 'px',
      color: color
    }"
    aria-hidden="true"
  >
    <use :xlink:href="'#b-icon-' + name" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String as PropType<string>,
      default: ''
    },
    color: {
      type: String as PropType<string>,
      default: ''
    },
    size: {
      type: Number as PropType<number>,
      default: 14
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.b-icon {
  vertical-align: middle;
  fill: currentcolor;
  transition: all 0.15s linear;
}
</style>
