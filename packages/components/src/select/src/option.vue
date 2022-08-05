<template>
  <li
      :class="[
      typeof selectedValue === 'string' &&
        obj.value === selectedValue &&
        'selected',
      Array.isArray(selectedValue) &&
        selectedValue.includes(obj.value) &&
        'selected',
      'option',
      obj.disabled && 'disabled'
    ]"
      @click.stop="clickHandler"
  >
    {{ obj.label }}
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import type {PropType} from 'vue'
import type {OptionsItem} from '../types'
import {injectMore} from '../../utils/vue-utils'

export default defineComponent({
  name: 'BOption',
  props: {
    obj: {
      type: Object as PropType<OptionsItem>,
      default: () => ({})
    }
  },
  setup(props) {
    const {label, value, disabled} = props.obj as OptionsItem
    const {selectHandler, selectedValue} = injectMore([
      'selectHandler',
      'selectedValue'
    ])

    const clickHandler = () => {
      disabled ||
      selectHandler.value({
        label: label,
        value: value,
        disabled: disabled
      })
    }

    selectedValue.value === value && clickHandler()

    return {clickHandler, selectedValue}
  }
})
</script>
