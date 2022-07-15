<template>
  <li
    :class="[
      $props.value === selectedValue && 'selected',
      'b-select-option',
      $props.disabled && 'b-select-disabled'
    ]"
    @click.stop="clickHandler"
  >
    {{ $props.label }}
  </li>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { OptionsItem } from './interface'
import { injectMore } from '@/utils'
import emitter from '@/plugins/emitter'

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

    emitter.on('getSelectedValue', value => {
      selectedValue.value = value
    })

    return { clickHandler, selectedValue }
  }
})
</script>
