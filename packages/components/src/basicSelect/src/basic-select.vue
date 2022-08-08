<template>
  <div class="b-select-basic" @click.stop="showDropdown">
    <b-input
      ref="input"
      v-model="label"
      readonly
      is-select
      @focus="focusHandler"
      @blur="blurHandler"
    >
      <template #suffix>
        <i class="iconfont b-icon-xiajiantou"></i>
      </template>
    </b-input>
    <transition name="zoom-in-top">
      <div v-show="visible" class="b-select-basic-dropdown" @click.stop>
        <slot name="default"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import '../style/index.less'
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch
} from 'vue'
import type { PropType } from 'vue'
import { addEvent, removeEvent } from '../../utils/vue-utils'
import BInput from '../../input/src/input.vue'

export default defineComponent({
  name: 'BasicSelect',
  components: { BInput },
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: ''
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'visible-change'],
  setup(props, { emit }) {
    const state = reactive({
      label: 'hello world',
      visible: false
    })
    const input = ref(null)
    const hiddenDropdown = () => (state.visible = false)

    onMounted(() => addEvent(document, 'click', hiddenDropdown))

    onBeforeUnmount(() => removeEvent(document, 'click', hiddenDropdown))

    watch(
      () => state.visible,
      visible => {
        emit('visible-change', visible)
        ;(input.value as any).setRotate(state.visible)
      }
    )

    function selectHandler(item: any) {
      state.label = item.label
      emit('update:modelValue', item.value)
    }

    function showDropdown() {
      state.visible = !state.visible
    }

    function focusHandler(e: Event) {
      emit('focus', e)
    }

    function blurHandler(e: Event) {
      emit('blur', e)
    }

    return {
      ...toRefs(state),
      input,
      blurHandler,
      focusHandler,
      showDropdown,
      selectHandler
    }
  }
})
</script>
