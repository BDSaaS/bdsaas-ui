<template>
  <label class="b-checkbox" :class="checkboxClass">
    <span class="b-checkbox-input">
      <span class="b-checkbox-inner iconfont b-icon-duihao"></span>
      <input
          :checked="modelValue"
          :disabled="disabled"
          class="b-checkbox-original"
          type="checkbox"
          @change="changeHandler"
      />
    </span>
    <span v-if="$slots.default || label" class="b-checkbox-label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts">
import '../style/index.less'
import {defineComponent, toRefs, computed, watch} from 'vue'
import type {PropType} from 'vue'

export default defineComponent({
  name: 'BCheckbox',
  props: {
    label: {
      type: String as PropType<string>
    },
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 用于 checkbox 的半选中状态（当其下属的 checkbox 没有全部选中时为 true）:indeterminate=“true” :checked="false"
    // 选中状态（下属的 checkbox 全部选中时）:indeterminate=“false” :checked="true"
    // 未选中状态（下属的 checkbox 全部未选中时）:indeterminate=“false” :checked="false"
    indeterminate: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['update:modelValue', 'update:indeterminate', 'change'],
  setup(props, {emit}) {
    const {modelValue, disabled, indeterminate} = toRefs(props)

    const checkboxClass = computed(() => [
      modelValue.value && 'is-checked',
      disabled.value && 'is-disabled',
      indeterminate.value && 'is-indeterminate'
    ])

    // 监听半选中状态为 true 时，取消复选框的选中
    watch(
        () => indeterminate.value,
        indeterminate => {
          indeterminate && emit('update:modelValue', false)
        }
    )

    function changeHandler(e: Event) {
      const checked = (e.target as HTMLInputElement).checked
      console.log('checkbox 内部', checked)
      emit('update:modelValue', checked)
      emit('update:indeterminate', false)
      emit('change', checked)
    }

    return {
      changeHandler,
      checkboxClass
    }
  }
})
</script>
