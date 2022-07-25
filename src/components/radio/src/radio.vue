<template>
  <label class="b-radio">
    <input
      type="radio"
      v-model="model"
      @change="handleChange"
      :value="label"
      :disabled="disabled"
      :checked="label === model"
      :name="radioName"
    />
    <span class="b-radio-icon"></span>
    <span class="b-radio-label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
export default defineComponent({
  name: 'radioComponent',
  props: {
    radioName: String as PropType<string>,
    modelValue: String as PropType<string>,
    disabled: Boolean as PropType<boolean>,
    label: String || Boolean || Number
  },
  setup(props, { emit }) {
    function handleChange(e: Event) {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
    }
    const model = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('change', value)
      }
    })
    return {
      model,
      handleChange
    }
  }
})
</script>

<style lang="less">
@import "../style/radio.less";
</style>
