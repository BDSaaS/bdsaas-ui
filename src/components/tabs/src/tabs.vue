<template>
  <div class="b-tabs">
    <div
      class="tabs-header"
      :class="{
        'tabs-header-card': type === 'card',
        'tabs-header-card-space': type === 'card-space'
      }"
    >
      <ul ref="headerRef" class="list">
        <li
          v-for="v in headerList"
          :key="v.name"
          class="item"
          :class="{ active: modelValue === v.name }"
          :name="v.name"
          @click="headerItemClickHandler(v.name)"
          @mouseenter="headerItemMouseenterHandler(v.name)"
          @mouseleave="headerItemMouseleaveHandler"
        >
          <a class="item-text">{{ v.label }}</a>
        </li>
      </ul>
      <div
        ref="underlineRef"
        v-if="type === ''"
        class="underline"
        :style="{ left: underlineLeft + 'px', width: underlineWidth + 'px' }"
      ></div>
    </div>
    <div class="tabs-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, nextTick } from 'vue'
import type { TabPaneProps } from './type'
import { provideMore } from '@tools/utils/vue-utils'

export default defineComponent({
  name: 'BTabs',
  props: {
    modelValue: {
      // v-model双向绑定
      type: String as PropType<string>,
      default: ''
    },
    type: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const headerList = ref<TabPaneProps[]>([])
    const headerRef = ref(null)
    const underlineRef = ref(null)
    const underlineLeft = ref<number>(0)
    const underlineWidth = ref<number>(0)

    let headerItemsWidth: number[] = []
    let headerItemsLeft: number[] = []

    function initList(item: TabPaneProps) {
      headerList.value.push({ ...item })
    }

    function headerItemClickHandler(name: string) {
      emit('update:modelValue', name)
    }

    function headerItemMouseenterHandler(name: string) {
      props.type === '' && setUnderlinePosition(name)
    }

    function headerItemMouseleaveHandler() {
      props.type === '' && setUnderlinePosition(props.modelValue)
    }

    function setUnderlinePosition(name: string) {
      const index = headerList.value.findIndex(v => v.name === name)
      underlineLeft.value = headerItemsLeft[index]
      underlineWidth.value = headerItemsWidth[index]
    }

    watch(
      () => props.modelValue,
      modelValue => {
        props.type === '' && setUnderlinePosition(modelValue)
        emit('change', modelValue)
      }
    )

    watch(
      headerList,
      () => {
        if (props.type === '') {
          nextTick(() => {
            const children = (headerRef as any).value.children
            const len = (headerRef as any).value.children.length
            for (let i = 0; i < len; i++) {
              headerItemsWidth.push(children[i].firstChild.offsetWidth)
              headerItemsLeft.push(children[i].firstChild.offsetLeft)

              if (Array.from(children[i].classList).includes('active')) {
                underlineLeft.value = children[i].firstChild.offsetLeft
                underlineWidth.value = children[i].firstChild.offsetWidth
              }
            }
          })
        }
      },
      { deep: true }
    )

    provideMore({
      initList,
      activeName: computed(() => props.modelValue)
    })

    return {
      headerList,
      headerRef,
      underlineRef,
      underlineLeft,
      underlineWidth,
      headerItemClickHandler,
      headerItemMouseenterHandler,
      headerItemMouseleaveHandler
    }
  }
})
</script>

<style lang="less">
@import "../style/index.less";
</style>
