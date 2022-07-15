<template>
  <svg
    :class="['b-icon', $attrs.class]"
    :style="{
      width: size + 'px',
      height: size + 'px',
      color: color,
      ...$attrs.style
    }"
    aria-hidden="true"
  >
    <use :href="'#b-icon-' + name" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'BIcon',
  props: {
    name: {
      type: String as PropType<string>,
      required: true
    },
    color: {
      type: String as PropType<string>,
      default: '#000'
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

<style lang="less" scoped>
@import "../style/index";
</style>
