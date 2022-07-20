<template>
  <li v-if="obj.divided" class="divided"></li>
  <li v-if="!obj.divided" class="menu-item">
    <div
      class="menu-item-text"
      :class="[
        obj.value === selectedValue && 'selected',
        obj.disabled && 'disabled'
      ]"
      @click.stop="clickHandler"
    >
      {{ obj.label }}
    </div>
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
    obj: {
      type: Object as PropType<OptionsItem>,
      default: () => ({})
    }
  },
  setup(props) {
    const { label, value, disabled, divided, children } =
      props.obj as OptionsItem
    const { selectHandler, selectedValue } = injectMore([
      'selectHandler',
      'selectedValue'
    ])

    const clickHandler = () => {
      disabled ||
        selectHandler.value({
          label: label,
          value: value,
          disabled: disabled,
          divided: divided,
          children: children
        })
    }

    selectedValue.value === value && clickHandler()

    return { clickHandler, selectedValue }
  }
})
</script>
