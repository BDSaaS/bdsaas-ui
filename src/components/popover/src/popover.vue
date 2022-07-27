<template>
  <div class="b-popover">
    <div ref="trigger">
      <slot></slot>
    </div>
    <b-popover-content v-if="!disabled"
                       :show="initStatus.show"
                       :position="position"
                       :enterable="enterable"
                       :placement="placement">
      <template #content>
        <p class="b-popover-title" v-if="title">{{title}}</p>
        <slot name="content"></slot>
      </template>
    </b-popover-content>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch } from 'vue'
import type { PropType } from 'vue'
import BPopoverContent from './content.vue'
export default defineComponent({
  name: 'BPopover',
  components: { BPopoverContent },
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
      boundClient: 0
    })
    const popover = ref(null)
    let trigger = ref(null)
    const position = reactive({
      top: 0,
      left: 0,
    })
    const showPopoverHandler = () => {
      initStatus.boundClient = trigger.value.getBoundingClientRect()
      initStatus.show = true
    }
    const closePopoverHandler = () => {
      setTimeout(() => {
        initStatus.show = false
      }, 400)
    }
    onMounted(()=>{
      if (props.trigger === 'hover') {
        trigger.value.addEventListener('mouseenter', () => {
          showPopoverHandler()
        })
        trigger.value.addEventListener('mouseleave', () => {
          closePopoverHandler()
        })
      }
      if (props.trigger === 'click') {
        trigger.value.addEventListener('click', () => {
          initStatus.boundClient = trigger.value.getBoundingClientRect()
          initStatus.show = !initStatus.show
        })
        document.addEventListener('click', event => {
          const e = event || window.event
          if (trigger && trigger.value && !trigger.value.contains(e.target)) {
            initStatus.show = false
          }
        })
      }
      if (props.trigger === 'manual') {
        trigger.value.addEventListener('click', () => {
          initStatus.boundClient = trigger.value.getBoundingClientRect()
          initStatus.show = !initStatus.show
        })
      }
      if (props.trigger === 'focus') {
        trigger.value.addEventListener('mousedown', function() {
          showPopoverHandler()
        }, true)
        trigger.value.addEventListener('mouseup', function() {
          initStatus.show = false
        }, true)
        document.addEventListener('click', event => {
          const e = event || window.event
          if (trigger && trigger.value && !trigger.value.contains(e.target)) {
            initStatus.show = false
          }
        })
      }
    })
    watch(() => initStatus.show, (newValue) => {
      if (newValue) {
        switch (props.placement){
        case 'top' :
          position.left = initStatus.boundClient.left + initStatus.boundClient.width / 2
          position.top = initStatus.boundClient.top
          break
        case 'left':
          position.left = initStatus.boundClient.left
          position.top = initStatus.boundClient.top + initStatus.boundClient.height / 2
          break
        case 'right':
          position.left = initStatus.boundClient.left + initStatus.boundClient.width
          position.top = initStatus.boundClient.top + initStatus.boundClient.height / 2
          break
        case 'bottom':
          position.left = initStatus.boundClient.left + initStatus.boundClient.width / 2
          position.top = initStatus.boundClient.top + initStatus.boundClient.height
          break
        default:
        }
      }
    })
    return {
      position,
      initStatus,
      popover,
      showPopoverHandler,
      closePopoverHandler
    }
  }


})
</script>
<style lang="less">
@import "../style/popover.less";
</style>
