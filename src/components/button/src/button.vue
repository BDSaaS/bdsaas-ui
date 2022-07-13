<template>
  <button :class="buttonClass" :disabled="$props.disabled">
    <slot></slot>
    <slot name="icon">
      <i :class="iconClass"></i>
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue'
import type { PropType } from 'vue'
import type {
  ButtonSize,
  ButtonType,
  IconType
} from '@/components/button/src/interface'
// import {ComponentOptionsBase} from "@vue/runtime-core"

export default defineComponent({
  name: 'BButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'default'
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    round: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    icon: {
      type: String as PropType<IconType>
      // required: true
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'default'
    }
  },
  setup(props, { slots }) {
    const { icon } = toRefs(props)
    const buttonClass = computed(() => [
      'b-button',
      `b-button-${props.type}`,
      props.disabled && 'b-button-disabled',
      props.round && 'b-button-round',
      props.size && `b-button-size-${props.size}`
    ])
    const showPropIcon = computed(() => !slots.icon && props.icon)
    const iconClass = computed(() => [
      'iconfont',
      showPropIcon.value && icon.value
    ])

    return {
      iconClass,
      buttonClass
    }
  }
})
</script>

<style lang="less">
@import "../style/button";
</style>
