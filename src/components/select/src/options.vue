<template>
  <li
    :class="[
      typeof selectedValue === 'string' &&
        value === selectedValue &&
        'selected',
      Array.isArray(selectedValue) &&
        selectedValue.includes(value) &&
        'selected',
      'option',
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
import type { OptionsItem } from './interface'
import { injectMore } from '@/utils'

export default defineComponent({
  name: 'BOption',
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
