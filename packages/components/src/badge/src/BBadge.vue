<template>
  <div class="b-badge">
    <slot></slot>
    <transition name="b-zoom-in-center">
      <sup
          v-show="content || isDot || content === 0"
          v-text="content"
          :class="badgeClass"
      >
      </sup>
    </transition>
  </div>
</template>

<script lang="ts">
import '../style/index.less'
import {computed, defineComponent, toRefs} from 'vue'
import type {badgeValue, badgeDot, badgeMax, badgeType} from '../types'
import type {PropType} from 'vue'

export default defineComponent({
  name: 'BBadge',
  props: {
    // 显示的数字
    value: {
      type: Number as PropType<badgeValue>,
      default: 1
    },
    // 最大值
    max: {
      type: Number as PropType<badgeMax>,
      default: 99
    },
    // 显示原点
    isDot: {
      type: Boolean as PropType<badgeDot>,
      default: false
    },
    type: {
      type: String as PropType<badgeType>,
      default: ''
    }
  },
  setup(props) {
    const {isDot, type} = toRefs(props)
    const content = computed(() => {
      if (isDot.value) return ''
      if (typeof props.value === 'number' && typeof props.max === 'number') {
        return props.max < props.value ? `${props.max}+` : props.value
      }

      return props.value
    })
    const badgeClass = computed(() => [
      props.isDot && 'b-badge-isdot',
      !props.isDot && 'b-badge-content',
      type.value && !props.isDot && `b-badge-${type.value}`
    ])
    return {
      content,
      badgeClass
    }
  }
})
</script>
