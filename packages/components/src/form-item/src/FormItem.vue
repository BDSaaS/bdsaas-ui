<template>
  <div class='b-form-item'>
    <div class="b-form-item-label" v-if="config.labelDisplay">{{ label }}</div>
    <div class="b-form-item-slot">
      <slot></slot>
    </div>
    <div class='b-form-item-error b-form-item-label-left' :class="eMsg?'error-show':'error-hide'">
      {{ eMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import '../style/index.less'
import Validator from '../../utils/wrenches/Validator'
import Lib from '../../utils/wrenches/Lib'
import {watch, defineComponent, inject, PropType, provide, onMounted, ref, toRefs} from 'vue'
import {UtilityFunction} from '../../utils/wrenches/Types/utility'
// block-view
export default defineComponent({
  name: 'BFormItem',
  props: {
    // label 名称
    label: {
      type: String,
      default: '',
    },
    steps: {
      type: Array as PropType<number[]>,
      default: () => {
        return []
      },
    },
    field: {
      type: String,
      default: '',
    },
  },
  setup(props, {expose}) {
    const {label, field} = toRefs(props)
    console.log('label+++++++++', label, field)


    // 注入
    const rules = inject('rules')
    const config = inject('config')

    const eMsg = ref('')
    const eMessage = ref('')

    watch(() => eMsg.value, (nv, ov) => {
      if (nv !== ov) {
        setTimeout(() => {
          eMessage.value = eMsg.value
        }, 200)
      }
    })

    // 绑定校验事件
    Validator.eventOn(rules as any, field.value, ({error}) => {
      eMsg.value = error
    })

    // const validatorOn = function () {
    //   // 绑定校验事件
    //   Validator.eventOn(rules as any, field as any, ({error}) => {
    //     eMsg.value = error
    //   })
    // }
    //
    // onMounted(() => {
    //   validatorOn()
    // })
    //
    // expose(validatorOn)

    // 下发数据
    provide('rules', rules)
    provide('field', field.value)

    return {
      config,
      label,
      eMsg,
      eMessage,
    }
  },
})
</script>
