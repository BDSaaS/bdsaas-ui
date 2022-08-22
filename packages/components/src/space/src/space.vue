<template>
  <div 
  class="b-space" 
  :style="{
    '--space-size':spaceSize,
    '--space-align':spaceAlign,
    '--space-direction':spaceDirection,
    }">
    <slot></slot>
    <!-- <div class="b-space-item" v-for="(item, index) in elements" :key="index">
      {{render(item)}}
    </div> -->
  </div>
</template>

<script lang="ts">
import "../style/index.less";
import { 
  defineComponent,
  PropType,
  computed,
  } from 'vue'
export default defineComponent({
  name: 'BSpace',
  props: {
    align: {
      type: String as PropType<'start' | 'end' | 'center' | 'baseline'> ,
      default: 'start'
    },
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'horizontal'
    },
    size: {
      type: String as PropType<'small' | 'middle' | 'large' | number> ,
      default: 8
    }
  },
  setup(props, { slots }) {

    const spaceSize = computed(() => {
      if ( props.size === 'small' ) {
        return '4px'
      } else if ( props.size === 'middle' ) {
        return '8px'
      } else if ( props.size === 'large' ) {
        return '12px'
      } else if ( /[0-9]/.test(props.size.toString()) ) {
        return props.size + 'px'
      } else {
        return '8px'
      }
    })

    // const elements = slots.default?.()

    const spaceAlign = computed(() => {
      switch (props.align) {
        case 'start':
          return 'flex-start'
        case 'end':
          return 'flex-end'
        case 'center':
          return 'center'
        case 'baseline':
          return 'baseline'
        default:
          return 'start'
      }
    })

    const spaceDirection = computed(() => {
      switch (props.direction) {
        case 'vertical' :
          return 'column'
        case 'horizontal':
          return 'row'
        default:
          return 'row'
      }
    })

    return {
      spaceSize,
      spaceAlign,
      spaceDirection,
      // elements
    }
  }
})
</script>
