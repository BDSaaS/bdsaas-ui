<template>
  <li v-if="divided" class="divided"></li>
  <li
    v-if="!divided"
    :class="[
      value === selectedValue && 'selected',
      'menu-item',
      disabled && 'disabled'
    ]"
    @click.stop="clickHandler"
  >
    {{ label }}
  </li>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { OptionsItem } from './type'
import { injectMore } from '@/utils'

export default defineComponent({
  name: 'BDropDownMenuItem',
  props: {
    label: {
      type: String as PropType<OptionsItem['label']>,
      default: ''
    },
    value: {
      type: String as PropType<OptionsItem['value']>,
      default: ''
    },
    disabled: {
      type: Boolean as PropType<OptionsItem['disabled']>,
      default: false
    },
    divided: {
      type: Boolean as PropType<OptionsItem['divided']>,
      default: false
    }
  },
  setup(props) {
    const { label, value, disabled } = toRefs(props)
    const { selectHandler, selectedValue } = injectMore([
      'selectHandler',
      'selectedValue'
    ])

    const clickHandler = () => {
      disabled.value ||
        selectHandler.value({
          label: label.value,
          value: value.value
        })
    }

    selectedValue.value === value.value && clickHandler()

    return { clickHandler, selectedValue }
  }
})
</script>
