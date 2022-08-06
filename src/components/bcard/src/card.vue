<template>
  <div :class="cardClass" v-if="headerContent">
    <div class="b-card-head" :class="headerBorderClass">
      <slot name="header">
        {{ title }}
      </slot>
    </div>
    <main class="b-card-main">
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { CardShowValue } from '@/components/bcard'
export default defineComponent({
  name: 'BCard',
  props: {
    title: {
      type: String,
      default: '头部'
    },
    width: {
      type: String,
      default: '300'
    },
    height: {
      type: String,
      default: '180'
    },
    isHeaderBorder: {
      type: Boolean,
      default: true
    },
    shadow: {
      type: String as PropType<CardShowValue>,
      default: 'hover'
    }
  },
  setup(props) {
    const { title, width, height, isHeaderBorder, shadow } = toRefs(props)
    const headerContent = title.value
    const bWidth = computed(() => width.value + 'px').value
    const bHeight = computed(() => height.value + 'px').value
    const cardClass = computed(() => ['b-card', `b-card-${shadow.value}`]).value
    const headerBorderClass = computed(() =>
      isHeaderBorder ? 'b-card-isHeaderBorder' : ''
    ).value
    console.log('打印打印1', bWidth, bHeight, headerBorderClass)
    return { headerContent, cardClass, bWidth, bHeight, headerBorderClass }
  }
})
</script>

<style scoped lang="less">
@import "../style/index.less";

.b-card {
  width: v-bind(bWidth);
  height: v-bind(bHeight);
}
</style>
