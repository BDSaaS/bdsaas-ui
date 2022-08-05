<template>
  <span :class="tagClass">
    <slot></slot>
    <slot name="icon">
      <transition appear>
        <b-icon
            v-if="closeAble"
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
import "../style/index.less";
import BIcon from '../../icon/src/icon.vue'
import {computed, PropType, defineComponent, toRefs} from 'vue'
import type {TagType} from '../types'

export default defineComponent({
  name: 'BTag',
  components: {BIcon},
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
  setup(props, {emit}) {
    const {closeAble} = toRefs(props)

    const tagClass = computed(() => ['b-tag', `b-tag-${props.type}`])
    const handleClose = () => {
      console.log('BTag')
      emit('close')
    }
    console.log('props', props)

    // eslint-disable-next-line vue/no-dupe-keys
    return {handleClose, tagClass, closeAble}
  }
})
</script>
