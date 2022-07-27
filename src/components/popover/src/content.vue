<template>
  <teleport to="body">
    <div class="b-popover-container"
         :class="{'is-visible': show, 'is-hover': enterable}"
         ref="popover"
         role="popover">
      <div :class="['b-popover-arrow', placement]"></div>
      <div class="b-popover-inner">
        <slot name="content"></slot>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import {
  defineComponent,
  ref } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'BPopover',
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    position: {
      type: Object as PropType<object>,
      default: () => ( {
        left: 0,
        top: 0
      })
    },
    placement: {
      type: String as PropType<string>,
      default: 'top'
    },
    enterable: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props) {
    const popover = ref<HTMLElement>()
    watch(() => props.show, (value) => {
      if (value) {
        switch (props.placement) {
        case 'top' :
          popover.value.style.top = props.position.top - popover.value.offsetHeight - 10 + 'px'
          popover.value.style.left = props.position.left - popover.value.offsetWidth / 2 + 'px'
          break
        case 'left':
          popover.value.style.top = props.position.top - popover.value.offsetHeight / 2 + 'px'
          popover.value.style.left = props.position.left - popover.value.offsetWidth - 10 + 'px'
          break
        case 'right':
          popover.value.style.top = props.position.top - popover.value.offsetHeight / 2 + 'px'
          popover.value.style.left = props.position.left + 13 + 'px'
          break
        case 'bottom':
          popover.value.style.top = props.position.top + 10 + 'px'
          popover.value.style.left = props.position.left - popover.value.offsetWidth / 2 + 'px'
          break
        default:
        }
      }
    })
    return {
      popover
    }
  }


})
</script>
<style lang="less">
@import "../style/popover.less";
</style>
