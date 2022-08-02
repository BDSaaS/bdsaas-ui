<template>
  <teleport to="body">
    <div
      class="b-tooltip-container"
      :class="{ 'is-visible': show, 'is-hover': enterable }"
      ref="popover"
      role="tooltip"
    >
      <div
        :class="['b-tooltip-arrow', effect + '-' + placement, placement]"
      ></div>
      <div class="b-tooltip-inner" :class="{ 'is-light': effect === 'light' }">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import type { PropType } from 'vue'
import type { Offset } from './interface'
export default defineComponent({
  name: 'BTooltipContent',
  props: {
    effect: {
      type: String as PropType<string>,
      default: 'dark'
    },
    show: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    position: {
      type: Object as PropType<Offset>,
      default: () => ({
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
    const popover = ref() as Ref<HTMLElement>
    watch(
      () => props.show,
      value => {
        if (value) {
          switch (props.placement) {
            case 'top':
              popover.value.style.top =
                props.position.top - popover.value.offsetHeight - 10 + 'px'
              popover.value.style.left =
                props.position.left - popover.value.offsetWidth / 2 + 'px'
              break
            case 'left':
              popover.value.style.top =
                props.position.top - popover.value.offsetHeight / 2 + 'px'
              popover.value.style.left =
                props.position.left - popover.value.offsetWidth - 10 + 'px'
              break
            case 'right':
              popover.value.style.top =
                props.position.top - popover.value.offsetHeight / 2 + 'px'
              popover.value.style.left = props.position.left + 13 + 'px'
              break
            case 'bottom':
              popover.value.style.top = props.position.top + 10 + 'px'
              popover.value.style.left =
                props.position.left - popover.value.offsetWidth / 2 + 'px'
              break
            default:
              popover.value.style.top =
                props.position.top - popover.value.offsetHeight - 10 + 'px'
              popover.value.style.left =
                props.position.left - popover.value.offsetWidth / 2 + 'px'
          }
        }
      }
    )
    return {
      popover
    }
  }
})
</script>
