<template>
  <div class="b-popover">
    <div ref="popTrigger">
      <slot></slot>
    </div>
    <b-popover-content
        v-if="!disabled"
        :show="initStatus.show"
        :position="position"
        :enterable="enterable"
        :placement="placement"
    >
      <template #content>
        <p class="b-popover-title" v-if="title">{{ title }}</p>
        <slot name="content"></slot>
      </template>
    </b-popover-content>
  </div>
</template>
<script lang="ts">
import "../style/index.less";
import {defineComponent, onMounted, reactive, Ref, ref, watch} from 'vue'
import type {PropType} from 'vue'
import BPopoverContent from './content.vue'

export default defineComponent({
  name: 'BPopover',
  components: {BPopoverContent},
  props: {
    trigger: {
      type: String as PropType<string>,
      default: 'hover'
    },
    title: {
      type: String as PropType<string>,
      default: ''
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
    const popover = ref() as Ref<HTMLElement>
    const popTrigger = ref() as Ref<HTMLElement>
    const position = reactive({
      top: 0,
      left: 0
    })
    const showPopoverHandler = () => {
      initStatus.boundClient = popTrigger.value.getBoundingClientRect()
      initStatus.show = true
    }
    const closePopoverHandler = () => {
      setTimeout(() => {
        initStatus.show = false
      }, 400)
    }
    onMounted(() => {
      if (props.trigger === 'hover') {
        popTrigger.value.addEventListener('mouseenter', () => {
          showPopoverHandler()
        })
        popTrigger.value.addEventListener('mouseleave', () => {
          closePopoverHandler()
        })
      }
      if (props.trigger === 'click') {
        popTrigger.value.addEventListener('click', () => {
          initStatus.boundClient = popTrigger.value.getBoundingClientRect()
          initStatus.show = !initStatus.show
        })
        document.addEventListener('click', event => {
          const e = event || window.event
          if (
              popTrigger &&
              popTrigger.value &&
              !popTrigger.value.contains((e as any).target)
          ) {
            initStatus.show = false
          }
        })
      }
      if (props.trigger === 'manual') {
        popTrigger.value.addEventListener('click', () => {
          initStatus.boundClient = popTrigger.value.getBoundingClientRect()
          initStatus.show = !initStatus.show
        })
      }
      if (props.trigger === 'focus') {
        popTrigger.value.addEventListener(
            'mousedown',
            function () {
              showPopoverHandler()
            },
            true
        )
        popTrigger.value.addEventListener(
            'mouseup',
            function () {
              initStatus.show = false
            },
            true
        )
        document.addEventListener('click', event => {
          const e = event || window.event
          if (
              popTrigger &&
              popTrigger.value &&
              !popTrigger.value.contains((e as any).target)
          ) {
            initStatus.show = false
          }
        })
      }
    })
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
            }
          }
        }
    )
    return {
      position,
      initStatus,
      popover,
      popTrigger,
      showPopoverHandler,
      closePopoverHandler
    }
  }
})
</script>
