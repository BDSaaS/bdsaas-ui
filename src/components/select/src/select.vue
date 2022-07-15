<template>
  <div
    :class="['b-select', $attrs.class]"
    :style="$attrs.style"
    @click.stop="clickHandler"
  >
    <div
      class="b-show-box"
      :class="{
        'b-show-box-placeholder': !label,
        'b-show-box-focus': visible,
        'b-show-box-non': !border,
        'b-show-box-disabled': disabled
      }"
    >
      {{ label || placeholder }}
      <b-icon
        v-if="!border && (!clearable || !isMouseEnter || !label)"
        class="b-arrow-inline"
        :class="{ 'b-arrow-down-roate': visible }"
        name="arrow-down-bold"
        color="#a3acbe"
      ></b-icon>
      <b-icon
        v-if="!border && clearable && isMouseEnter && label"
        class="b-error-inline"
        name="error"
        color="#a3acbe"
        @click.stop="clearHandler"
        @mouseenter="mouseenterHandler"
      ></b-icon>
    </div>
    <b-input
      ref="input"
      readonly
      is-select
      :class="{ 'b-input-disabled': disabled }"
      @mouseenter="mouseenterHandler"
      @mouseleave="mouseleaveHandler"
      @focus="focusHandler"
      @blur="blurHandler"
    ></b-input>
    <b-icon
      v-if="border && (!clearable || !isMouseEnter || !label)"
      class="b-arrow-down"
      :class="{ 'b-arrow-down-roate': visible }"
      name="arrow-down-bold"
      color="#a3acbe"
    ></b-icon>
    <b-icon
      v-if="border && clearable && isMouseEnter && label"
      class="b-error-down"
      name="error"
      color="#a3acbe"
      @click.stop="clearHandler"
      @mouseenter="mouseenterHandler"
    ></b-icon>
    <transition name="zoom-in-top">
      <div v-show="visible" class="b-select-dropdown">
        <ul
          class="b-select-dropdown-list"
          :style="{ 'text-align': border ? 'left' : 'center' }"
        >
          <template v-if="!$slots.default">
            <li
              v-for="(item, index) of $props.options"
              :key="index"
              :class="[
                item.value === $props.modelValue && 'selected',
                'b-select-option',
                item.disabled && 'b-select-disabled'
              ]"
              @click.stop="selectHandler(item)"
            >
              {{ item.label }}
            </li>
          </template>
          <slot v-else></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch
} from 'vue'
import { getLabel } from './interface'
import type { PropType } from 'vue'
import type { Options, OptionsItem } from './interface'
import { addEvent, provideMore, removeEvent } from '@/utils'
import BInput from '@/components/input/src/input.vue'
import emitter from '@/plugins/emitter'
import BIcon from '@/components/icon/src/icon.vue'

export default defineComponent({
  name: 'BSelect',
  components: { BInput, BIcon },
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: ''
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    options: {
      type: Array as PropType<Options>,
      default: () => []
    },
    placeholder: {
      type: String as PropType<string>,
      default: '请选择'
    },
    clearable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    border: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'visible-change'],
  setup(props, { emit }) {
    const state = reactive({
      label: getLabel(props.options, props.modelValue) || '',
      visible: false,
      isMouseEnter: false
    })
    const input = ref(null)

    const showDropdown = () => (state.visible = true)
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

    function selectHandler(item: OptionsItem) {
      if (item.disabled) {
        return false
      }
      hiddenDropdown()
      state.label = item.label
      emit('update:modelValue', item.value)
      emitter.emit('getSelectedValue', item.value)
    }

    function focusHandler(e: Event) {
      emit('focus', e)
    }

    function blurHandler(e: Event) {
      emit('blur', e)
    }

    function clickHandler() {
      if (props.disabled) {
        return false
      }
      state.visible ? hiddenDropdown() : showDropdown()
    }

    function mouseenterHandler() {
      if (props.disabled) {
        return false
      }
      state.isMouseEnter = true
    }

    function mouseleaveHandler() {
      state.isMouseEnter = false
    }

    function clearHandler() {
      state.visible && hiddenDropdown()
      state.label = ''
    }

    provideMore({
      selectHandler,
      selectedValue: props.modelValue
    })

    return {
      ...toRefs(state),
      input,
      blurHandler,
      focusHandler,
      clickHandler,
      selectHandler,
      mouseenterHandler,
      mouseleaveHandler,
      clearHandler
    }
  }
})
</script>

<style lang="less">
@import "../style/select.less";
</style>
