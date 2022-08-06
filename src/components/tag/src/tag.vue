<template>
  <span :class="tagClass">
    <slot></slot>
    <slot name="icon">
      <transition appear>
        <b-icon
          v-if="isCloseAble"
          name="close"
          class="tag-close"
          style="width: 16px; height: 16px; margin-left: 4px;"
          @click="handleClose"
        ></b-icon>
      </transition>
    </slot>
  </span>
</template>

<script lang="ts">
import BIcon from '@/components/icon/src/icon.vue'
import { computed, PropType } from 'vue'
import type { TagType } from '@/components/tag/src/interface'
export default defineComponent({
  name: 'BTag',
  components: { BIcon },
  props: {
    type: {
      type: String as PropType<TagType>,
      default: 'primary'
    },
    closeAble: {
      type: Boolean,
      default: false
    },
    'disable-transitions': {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const { closeAble } = toRefs(props)
    const isCloseAble = closeAble
    const tagClass = computed(() => ['b-tag', `b-tag-${props.type}`])
    const handleClose = () => {
      console.log('BTag')
      emit('close')
    }
    console.log('props', props)

    return { handleClose, tagClass, isCloseAble }
  }
})
</script>

<style scoped lang="less">
@import "../style/index.less";
</style>
