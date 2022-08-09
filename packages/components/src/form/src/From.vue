<template>
  <form class="b-form">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import Validator from '../../utils/wrenches/Validator'
import Lib from '../../utils/wrenches/Lib'
import {computed, defineComponent, PropType, provide, reactive, toRefs} from 'vue'
import {UtilityFunction} from '@/utils/wrenches/Types/utility'
// block-view
export default defineComponent({
  name: 'BForm',
  props: {
    // 验证器
    rules: Object as PropType<Record<string, any> | Record<string, any>[]>,
    // 验证数据
    formData: Object as PropType<Record<string, any>>,
    // 配置文件
    labelWidth: [String, Number],
    labelDisplay: {
      type: Boolean,
      default: false,
    },
    labelPosition: {type: String, default: 'left', values: ['left', 'right', 'top']},
  },
  setup(props, {expose}) {
    const {rules, formData, labelDisplay, labelPosition} = reactive(props)
    provide('rules', rules)
    const configLabelWidth = computed(() => {
      const {labelWidth} = props
      if (Lib.isNumber(labelWidth)) {
        return `${labelWidth}px`
      } else if (Lib.isString(labelWidth)) {
        return labelWidth
      }
      return '50px'
    })
    const formConfig = reactive({
      labelWidth: configLabelWidth,
      labelDisplay: labelDisplay,
      labelPosition: labelPosition,
      formData: formData,
    })
    provide('config', formConfig)

    function validator(callback: UtilityFunction) {
      if (!Lib.isObject(rules) || !Lib.isObject(formData)) {
        console.warn('Rules and form data must be objects')
      } else {
        return Lib.isFunction(callback) ? Validator.validate(rules, formData, callback) : Validator.validate(
            rules, formData)
      }
    }

    expose(validator)
  },
})
</script>
