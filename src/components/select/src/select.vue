<template>
  <div
    :class="[
      'b-select',
      $attrs.class,
      !border && 'b-select-non',
      inline && 'b-select-inline',
      multiple && 'b-select-multiple'
    ]"
    :style="$attrs.style"
    @click.stop="clickHandler"
  >
    <div
      v-if="!multiple"
      :class="[
        'b-show-box',
        !$props.modelValue && 'b-show-box-placeholder',
        visible && 'b-show-box-focus',
        !border && 'b-show-box-non',
        disabled && 'b-show-box-disabled'
      ]"
    >
      {{ $props.modelValue ? label : placeholder }}
      <b-icon
        v-if="!border && (!clearable || !isMouseEnter || !$props.modelValue)"
        class="b-arrow-inline"
        :class="{ 'b-arrow-down-roate': visible }"
        name="arrow-down-bold"
        color="#a3acbe"
      ></b-icon>
      <b-icon
        v-if="!border && clearable && isMouseEnter && $props.modelValue"
        class="b-error-inline"
        name="error"
        color="#a3acbe"
        @click.stop="clearHandler"
        @mouseenter="mouseenterHandler"
      ></b-icon>
      <b-icon
        v-if="border && (!clearable || !isMouseEnter || !$props.modelValue)"
        class="b-arrow-down"
        :class="{ 'b-arrow-down-roate': visible }"
        name="arrow-down-bold"
        color="#a3acbe"
      ></b-icon>
      <b-icon
        v-if="border && clearable && isMouseEnter && $props.modelValue"
        class="b-error-down"
        name="error"
        color="#a3acbe"
        @click.stop="clearHandler"
        @mouseenter="mouseenterHandler"
      ></b-icon>
    </div>
    <div
      v-if="multiple"
      :class="[
        'b-show-box',
        $props.modelValue.length && 'b-show-box-multiple',
        !$props.modelValue.length && 'b-show-box-placeholder',
        visible && 'b-show-box-focus',
        disabled && 'b-show-box-disabled'
      ]"
    >
      {{ $props.modelValue.length ? '' : placeholder }}
      <ul class="b-tags clearfix">
        <li class="b-tag" v-for="v in multipleList" :key="v.value">
          {{ v.label
          }}<b-icon
            class="b-tag-close"
            name="close"
            :size="16"
            color="#a3acbe"
            @click.stop="tagClickHandler(v)"
          ></b-icon>
        </li>
      </ul>
      <b-icon
        class="b-arrow-down"
        :class="{ 'b-arrow-down-roate': visible }"
        name="arrow-down-bold"
        color="#a3acbe"
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
                $props.multiple &&
                  $props.modelValue.includes(item.value) &&
                  'selected',
                !$props.multiple &&
                  $props.modelValue === item.value &&
                  'selected',
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
  watch,
  computed
} from 'vue'
import { getLabel, getList } from './interface'
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
      // v-model双向绑定
      type: [String, Array],
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
    border: {
      // 是否有边框
      type: Boolean as PropType<boolean>,
      default: true
    },
    inline: {
      // 是否是行内元素
      type: Boolean as PropType<boolean>,
      default: false
    },
    multiple: {
      // 是否多选
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'visible-change'],
  setup(props, { emit }) {
    const state = reactive({
      label: getLabel(props.options, props.modelValue as string),
      multipleList: getList(props.options, props.modelValue as string[]),
      visible: false,
      isMouseEnter: false
    })
    const input = ref(null)

    const showDropdown = () => (state.visible = true)
    const hiddenDropdown = () => (state.visible = false)

    onMounted(() => addEvent(document, 'click', hiddenDropdown))

    onBeforeUnmount(() => removeEvent(document, 'click', hiddenDropdown))

    watch(
      [() => state.visible, () => props.modelValue],
      (visible, modelValue) => {
        console.log('visible', visible)
        console.log('modelValue', modelValue)
        emit('visible-change', visible)
        ;(input.value as any).setRotate(state.visible)
      }
    )

    function selectHandler(item: OptionsItem) {
      if (item.disabled) {
        return false
      }
      let value = null
      let label = ''
      let multipleList: any[] = []
      if (props.multiple) {
        value = props.modelValue.includes(item.value)
          ? (props.modelValue as string[]).filter(each => item.value !== each)
          : [...props.modelValue, item.value]
        multipleList = props.modelValue.includes(item.value)
          ? state.multipleList.filter(each => item.value !== each.value)
          : [...state.multipleList, item]
      } else {
        label = item.label
        value = item.value
        hiddenDropdown()
      }
      state.label = label
      state.multipleList = multipleList
      emit('update:modelValue', value)
      // emitter.emit('getSelectedValue', value)
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
      state.multipleList = []
      props.multiple
        ? emit('update:modelValue', [])
        : emit('update:modelValue', '')
    }

    function tagClickHandler(item: OptionsItem) {
      selectHandler(item)
    }

    provideMore({
      selectHandler,
      selectedValue: computed(() => props.modelValue)
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
      clearHandler,
      tagClickHandler
    }
  }
})
</script>

<style lang="less">
@import "../style/select.less";
</style>
