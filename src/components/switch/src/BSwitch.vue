<template>
  <div
    :class="switchClass"
    :disabled="$props.disabled"
    @click.prevent="switchValue"
  >
    <div class="b-switch-round"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { checkedType } from './interface'

export default defineComponent({
  name: 'BSwitch',
  props: {
    checked: {
      type: Boolean as PropType<checkedType>,
      default: false
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['change', 'update:checked'],
  setup(props, { emit }) {
    const { checked, disabled } = toRefs(props)
    const switchClass = computed(() => [
      'b-switch',
      checked.value && 'b-switch-active',
      disabled.value && checked.value && 'b-switch-opendisabled',
      disabled.value && !checked.value && 'b-switch-closedisabled'
    ])
    const switchValue = () => {
      if (disabled.value) return
      emit('update:checked', !checked.value)
    }
    return { switchClass, switchValue }
  }
})
</script>

<style scoped lang="less">
@import "../style/switch.less";
</style>
