<template>
  <div
    class="b-dropdown"
    :class="{ 'b-dropdown-omit': omit }"
    @click.stop="clickHandler"
    @mouseenter="mouseenterHandler"
    @mouseleave="mouseleaveHandler"
  >
    <div
      v-if="omit"
      ref="box"
      class="omit"
      :class="{ 'omit-disabled': disabled, 'omit-hover': isMouseEnter }"
    >
      <b-icon name="more" style="font-size: 24px;"></b-icon>
    </div>
    <div
      v-if="!omit"
      ref="box"
      :class="[
        'show-box',
        !modelValue && 'show-box-placeholder',
        disabled && 'show-box-disabled'
      ]"
    >
      <div class="show-box-inline">{{ modelValue ? label : placeholder }}</div>
      <b-icon
        v-if="!clearable || !isMouseEnter || !modelValue"
        class="arrow-down"
        :class="{ 'arrow-roate': visible }"
        name="arrow-down-bold"
        style="color: #a3acbe;"
      ></b-icon>
      <b-icon
        v-if="clearable && isMouseEnter && modelValue"
        class="error-down"
        name="error"
        style="color: #a3acbe;"
        @click.stop="clearHandler"
        @mouseenter="mouseenterHandler"
      ></b-icon>
    </div>
    <transition :name="position === 'top' ? 'zoom-in-top' : 'zoom-in-bottom'">
      <div
        v-show="visible"
        class="dropdown"
        :class="{
          'dropdown-top': position === 'top',
          'dropdown-bottom': position === 'bottom'
        }"
      >
        <div class="dropdown-box">
          <template v-if="!$slots.default">
            <ul class="menu">
              <template v-for="(item, index) of options" :key="index">
                <li v-if="item.divided" class="divided"></li>
                <li
                  :class="[
                    modelValue === item.value && 'selected',
                    'menu-item',
                    item.disabled && 'disabled'
                  ]"
                  @click.stop="selectHandler(item)"
                >
                  {{ item.label }}
                </li>
              </template>
            </ul>
          </template>
          <slot v-else></slot>
        </div>
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
  toRefs,
  watch,
  computed
} from 'vue'
import { getLabel } from './type'
import type { PropType } from 'vue'
import type { Options, OptionsItem } from './type'
import { addEvent, provideMore, removeEvent } from '@/utils'
import BIcon from '@/components/icon/src/icon.vue'

export default defineComponent({
  name: 'BDropDown',
  components: { BIcon },
  props: {
    modelValue: {
      // v-model双向绑定
      type: String as PropType<string>,
      default: ''
    },
    disabled: {
      // 禁用
      type: Boolean as PropType<boolean>,
      default: false
    },
    options: {
      // 列表数据
      type: Array as PropType<Options>,
      default: () => []
    },
    placeholder: {
      // 默认展示文字
      type: String as PropType<string>,
      default: '请选择'
    },
    clearable: {
      // 是否可清空
      type: Boolean as PropType<boolean>,
      default: false
    },
    omit: {
      // 是否是收起状态
      type: Boolean as PropType<boolean>,
      default: false
    },
    trigger: {
      // 触发条件
      type: String as PropType<string>,
      default: 'hover'
    }
  },
  emits: ['update:modelValue', 'change', 'visible-change'],
  setup(props, { emit }) {
    const state = reactive({
      label: getLabel(props.options, props.modelValue as string),
      visible: false,
      isMouseEnter: false,
      position: ''
    })
    const box = ref(null)

    const showDropdown = () => (state.visible = true)
    const hiddenDropdown = () => (state.visible = false)

    onMounted(() => addEvent(document, 'click', hiddenDropdown))

    onBeforeUnmount(() => removeEvent(document, 'click', hiddenDropdown))

    watch(
      [() => state.visible, () => props.modelValue],
      (visible, modelValue) => {
        emit('visible-change', visible)
      }
    )

    function selectHandler(item: OptionsItem) {
      if (item.disabled) {
        return false
      }
      let value = null
      let label = ''
      label = item.label
      value = item.value
      hiddenDropdown()
      value !== props.modelValue && emit('change', value)
      state.label = label
      emit('update:modelValue', value)
    }

    function clickHandler() {
      if (props.disabled) {
        return false
      }
      if (props.trigger === 'click') {
        const top = (box as any).value.getBoundingClientRect().top
        const bottom =
          document.documentElement.clientHeight -
          (box as any).value.getBoundingClientRect().bottom
        const distance = 232
        if (top >= distance && bottom < distance) {
          state.position = 'bottom'
        } else {
          state.position = 'top'
        }
        state.visible ? hiddenDropdown() : showDropdown()
      }
    }

    function mouseenterHandler() {
      if (props.disabled) {
        return false
      }
      const top = (box as any).value.getBoundingClientRect().top
      const bottom =
        document.documentElement.clientHeight -
        (box as any).value.getBoundingClientRect().bottom
      const distance = 232
      if (top >= distance && bottom < distance) {
        state.position = 'bottom'
      } else {
        state.position = 'top'
      }
      state.isMouseEnter = true
      props.trigger === 'hover' && showDropdown()
    }

    function mouseleaveHandler() {
      state.isMouseEnter = false
      props.trigger === 'hover' && hiddenDropdown()
    }

    function clearHandler() {
      state.label = ''
      emit('update:modelValue', '')
    }

    provideMore({
      selectHandler,
      selectedValue: computed(() => props.modelValue)
    })

    return {
      ...toRefs(state),
      box,
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
@import "../style/index.less";
</style>
