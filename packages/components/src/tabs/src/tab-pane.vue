<template>
  <div class="hide" :class="{ show: activeName === name }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { injectMore } from '../../utils/vue-utils'

export default defineComponent({
  name: 'BTabPane',
  props: {
    label: {
      type: String as PropType<string>,
      default: ''
    },
    name: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props, { slots }) {
    const { initList, activeName } = injectMore(['initList', 'activeName'])

    initList.value({
      label: props.label,
      name: props.name,
      slot: slots
    })

    return {
      activeName
    }
  }
})
</script>
