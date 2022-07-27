<template>
  <div class="b-tooltip">
    <div
      ref="trigger"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot></slot>
    </div>
    <b-tooltip-content
      v-if="!disabled"
      :show="initStatus.show"
      :position="position"
      :effect="effect"
      :enterable="enterable"
      :placement="placement"
    >
      <slot name="content"></slot>
    </b-tooltip-content>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, Ref } from 'vue'
import type { PropType } from 'vue'
import BTooltipContent from './content.vue'
export default defineComponent({
  name: 'BTooltip',
  components: { BTooltipContent },
  props: {
    effect: {
      type: String as PropType<string>,
      default: 'dark'
    },
    enterable: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    content: {
      type: String as PropType<string>,
      default: ''
    },
    header: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    placement: {
      type: String as PropType<string>,
      default: 'top'
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props) {
    const initStatus = reactive({
      show: false,
      boundClient: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    })
    const popover = ref(null)
    const trigger = ref() as Ref<HTMLElement>
    const position = reactive({
      top: 0,
      left: 0
    })
    const handleMouseEnter = () => {
      initStatus.boundClient = trigger.value.getBoundingClientRect()
      initStatus.show = true
    }
    const handleMouseLeave = () => {
      setTimeout(() => {
        initStatus.show = false
      }, 200)
    }
    watch(
      () => initStatus.show,
      newValue => {
        if (newValue) {
          switch (props.placement) {
          case 'top':
            position.left =
              initStatus.boundClient.left + initStatus.boundClient.width / 2
            position.top = initStatus.boundClient.top
            break
          case 'left':
            position.left = initStatus.boundClient.left
            position.top =
              initStatus.boundClient.top + initStatus.boundClient.height / 2
            break
          case 'right':
            position.left =
              initStatus.boundClient.left + initStatus.boundClient.width
            position.top =
              initStatus.boundClient.top + initStatus.boundClient.height / 2
            break
          case 'bottom':
            position.left =
              initStatus.boundClient.left + initStatus.boundClient.width / 2
            position.top =
              initStatus.boundClient.top + initStatus.boundClient.height
            break
          default:
            position.left =
              initStatus.boundClient.left + initStatus.boundClient.width / 2
            position.top = initStatus.boundClient.top
          }
        }
      }
    )
    return {
      position,
      initStatus,
      popover,
      trigger,
      handleMouseEnter,
      handleMouseLeave
    }
  }
})
</script>
<style lang="less">
@import "../style/tooltip.less";
</style>
