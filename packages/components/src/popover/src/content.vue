<template>
  <teleport to="body">
    <div
        class="b-popover-container"
        :class="{ 'is-visible': show, 'is-hover': enterable }"
        ref="popover"
    >
      <div :class="['b-popover-arrow', placement]"></div>
      <div class="b-popover-inner">
        <slot name="content"></slot>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import {defineComponent, ref, Ref, watch} from 'vue'
import type {PropType} from 'vue'
import type {Offset} from '../types'

export default defineComponent({
  name: 'BPopoverContent',
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
