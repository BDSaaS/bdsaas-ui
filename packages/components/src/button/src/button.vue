<template>
  <button :class="buttonClass" :disabled="$props.disabled">
    <slot></slot>
    <slot name="icon">
      <b-icon v-if="showPropIcon" :name="$props.icon"/>
    </slot>
  </button>
</template>

<script lang="ts">
import '../style/index.less'
import {defineComponent, toRefs, computed, unref} from 'vue'
import type {PropType} from 'vue'
import type {
  ButtonSize,
  ButtonType,
  IconType
} from '../types'
import BIcon from '../../icon/src/icon.vue'

export default defineComponent({
  name: 'BButton',
  components: {
    BIcon
  },
  props: {
    // 按钮类别
    type: {
      type: String as PropType<ButtonType>,
      default: 'default'
    },
    // 禁用
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 圆角
    round: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 图标
    icon: {
      type: String as PropType<IconType>
    },
    // 大小
    size: {
      type: String as PropType<ButtonSize>,
      default: 'default'
    },
    // 按钮外层，用来自定义按钮
    wrapperClass: {
      type: String
    }
  },
  setup(props, {slots}) {
    const {icon, wrapperClass} = toRefs(props)
    const showPropIcon = computed(() => !slots.icon && props.icon)
    const hasIcon = computed(() => slots.icon || props.icon)
    const buttonClass = computed(() => [
      unref(wrapperClass) && unref(wrapperClass),
      'b-button',
      `b-button-${props.type}`,
      props.disabled && 'b-button-disabled',
      props.round && 'b-button-round',
      props.size && `b-button-size-${props.size}`,
      unref(hasIcon) && 'b-button-has-icon'
    ])
    const iconClass = computed(() => [
      'iconfont',
      showPropIcon.value && unref(icon)
    ])

    return {
      iconClass,
      buttonClass,
      showPropIcon
    }
  }
})
</script>
