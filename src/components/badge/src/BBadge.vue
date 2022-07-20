<template>
  <div class="b-badge">
    <slot>
      <b-button></b-button>
    </slot>
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
import { computed, defineComponent } from 'vue'
import BButton from '@/components/button/src/button.vue'
// import type { badgeProps } from './interface'
// import type { PropType } from 'vue'
export default defineComponent({
  name: 'BBadge',
  components: { BButton },
  props: {
    // 显示的数字
    value: {
      type: Number,
      default: 1
    },
    // 最大值
    max: {
      type: Number,
      default: 99
    },
    // 显示原点
    isDot: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const content = computed(() => {
      if (props.isDot) return ''

      if (typeof props.value === 'number' && typeof props.max === 'number') {
        return props.max < props.value ? `${props.max}+` : props.value
      }

      return props.value
    })
    const badgeClass = computed(() => [
      props.isDot && 'b-badge-isdot',
      !props.isDot && 'b-badge-content'
    ])
    return {
      content,
      badgeClass
    }
  }
})
</script>
<style lang="less" scoped>
@import "../style/badge.less";
</style>
