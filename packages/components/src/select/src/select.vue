<template>
  <div
      :class="[
      'b-select',
      !border && 'b-select-non',
      inline && 'b-select-inline',
      multiple && 'b-select-multiple'
    ]"
      @mouseenter="mouseenterHandler"
      @mouseleave="mouseleaveHandler"
      @click.stop="clickHandler"
  >
    <div
        v-if="!multiple"
        ref="box"
        :class="[
        'show-box',
        isMouseEnter && !disabled && 'show-box-hover',
        !modelValue && 'show-box-placeholder',
        visible && 'show-box-focus',
        !border && 'show-box-non',
        disabled && 'show-box-disabled'
      ]"
    >
      <div class="show-box-inline">{{ modelValue ? label : placeholder }}</div>
      <b-icon
          v-if="!border && (!clearable || !isMouseEnter || !modelValue)"
          class="arrow-inline"
          :class="{ 'arrow-roate': visible }"
          name="arrow-down-bold"
      ></b-icon>
      <b-icon
          v-if="!border && clearable && isMouseEnter && modelValue"
          class="error-inline"
          name="error"
          @click.stop="clearHandler"
          @mouseenter="mouseenterHandler"
      ></b-icon>
      <b-icon
          v-if="border && (!clearable || !isMouseEnter || !modelValue)"
          class="arrow-down"
          :class="{ 'arrow-roate': visible }"
          name="arrow-down-bold"
      ></b-icon>
      <b-icon
          v-if="border && clearable && isMouseEnter && modelValue"
          class="error-down"
          name="error"
          @click.stop="clearHandler"
          @mouseenter="mouseenterHandler"
      ></b-icon>
    </div>
    <div
        v-if="multiple"
        ref="box"
        :class="[
        'show-box',
        isMouseEnter && !disabled && 'show-box-hover',
        modelValue.length && 'show-box-multiple',
        !modelValue.length && 'show-box-placeholder',
        visible && 'show-box-focus',
        disabled && 'show-box-disabled'
      ]"
    >
      {{ modelValue.length ? '' : placeholder }}
      <ul class="tags clearfix">
        <li class="tag" v-for="v in multipleList" :key="v.value">
          {{
            v.label
          }}
          <b-icon
              class="tag-close"
              name="close"
              :size="16"
              @click.stop="tagClickHandler(v)"
          ></b-icon>
        </li>
      </ul>
      <b-icon
          class="arrow-down"
          :class="{ 'arrow-roate': visible }"
          name="arrow-down-bold"
      ></b-icon>
    </div>
    <b-input
        ref="input"
        readonly
        is-select
        :class="{ 'input-disabled': disabled }"
        @focus="focusHandler"
        @blur="blurHandler"
    ></b-input>
    <transition :name="position === 'top' ? 'zoom-in-top' : 'zoom-in-bottom'">
      <div
          v-show="visible"
          class="dropdown"
          :class="{
          'dropdown-top': position === 'top',
          'dropdown-bottom': position === 'bottom'
        }"
          @click.stop
      >
        <div class="dropdown-box">
          <ul
              class="dropdown-list"
              :style="{ 'text-align': border ? 'left' : 'center' }"
          >
            <template v-if="!$slots.default">
              <li
                  v-for="(item, index) of options"
                  :key="index"
                  :class="[
                  multiple && modelValue.includes(item.value) && 'selected',
                  !multiple && modelValue === item.value && 'selected',
                  'option',
                  item.disabled && 'disabled'
                ]"
                  @click.stop="selectHandler(item)"
              >
                {{ item.label }}
              </li>
            </template>
            <slot v-else></slot>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import "../style/index.less";
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
import {getLabel, getList} from '../types'
import type {PropType} from 'vue'
import type {Options, OptionsItem} from '../types'
import {addEvent, provideMore, removeEvent} from '../../utils/vue-utils'
import BInput from '../../input/src/input.vue'
import BIcon from '../../icon/src/icon.vue'

export default defineComponent({
  name: 'BSelect',
  components: {BInput, BIcon},
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
  setup(props, {emit}) {
    const state = reactive({
      label: getLabel(props.options, props.modelValue as string),
      multipleList: getList(props.options, props.modelValue as string[]),
      visible: false,
      isMouseEnter: false
    })
    const box = ref(null)
    const position = computed(() => {
      let flag = ''
      if (state.visible) {
        const top = (box as any).value.getBoundingClientRect().top
        const bottom =
            document.documentElement.clientHeight -
            (box as any).value.getBoundingClientRect().bottom
        const distance = 232
        if (top >= distance && bottom < distance) {
          flag = 'bottom'
        } else {
          flag = 'top'
        }
      }
      return flag
    })

    const showDropdown = () => (state.visible = true)
    const hiddenDropdown = () => (state.visible = false)

    onMounted(() => addEvent(document, 'click', hiddenDropdown))

    onBeforeUnmount(() => removeEvent(document, 'click', hiddenDropdown))

    watch(
        () => state.visible,
        visible => {
          emit('visible-change', visible)
        }
    )

    watch(
        () => props.modelValue,
        modelValue => {
          if (props.options.length) {
            state.label = getLabel(props.options, modelValue as string)
            state.multipleList = getList(props.options, modelValue as string[])
          }
          emit('change', modelValue)
        }
    )

    watch(
        () => props.options,
        options => {
          state.label = getLabel(options, props.modelValue as string)
          state.multipleList = getList(options, props.modelValue as string[])
        }
    )

    function selectHandler(item: OptionsItem) {
      if (item.disabled) {
        return false
      }
      let value = null
      let label = ''
      let multipleList: Options = []
      if (props.multiple) {
        value = props.modelValue.includes(item.value)
            ? (props.modelValue as string[]).filter(each => item.value !== each)
            : [...props.modelValue, item.value]
        multipleList = state.multipleList.includes(item.value)
            ? state.multipleList.filter(each => item.value !== each.value)
            : [...state.multipleList, item]
      } else {
        value = item.value
        label = item.label
        hiddenDropdown()
      }
      state.label = label
      state.multipleList = multipleList
      emit('update:modelValue', value)
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
      box,
      position,
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
