<template>
  <transition name="message-fade" @before-leave="onClose" @after-leave="$emit('uninstall')">
    <div v-show="visible" :style="offsetTop" role="alert" :class="IType">
      <span>{{ IContent }}</span>
      <i @click="close" :class="IIconType"></i>
    </div>
  </transition>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, onUnmounted, ref} from 'vue'
export default defineComponent({
  name: 'message1',
  props: {
    // 提示类型
    type: {
      type: String,
      default: 'success'
    },
    // 提示文本
    message: {
      type: String,
      default: ''
    },
    // 延迟时间
    duration: {
      type: Number,
      default: 3000
    },
    // 关闭按钮类型
    iconType: {
      type: String,
      default: ''
    },
    // mess组件的偏移值
    offset: {
      type: Number,
      default: 20
    },
    // 关闭前的回调
    onClose: {
      type: Function,
      default: ():void => {}
    }
  },
  setup(props) {
    // message组件的状态
    const visible = ref(false)
    // 定时器
    let timer:any
    // 提示样式
    const IType = computed(() => {
      return ['message',`${props.type}`]
    })
    // 提示文本
    const IContent = computed(() => {
      return props.message
    })
    // Icon样式
    const IIconType = computed(() => {
      return ['icon',`${props.iconType}`]
    })
    // 偏移值
    const offsetTop = computed(() => {
      return { top: `${props.offset}px` }
    })
    // 关闭提示框
    const close = () => {
      visible.value = false
    }
    // 挂载
    onMounted(() => {
      visible.value = true
      timer = setTimeout(() => {
        visible.value = false
      }, props.duration)
    })
    // 卸载
    onUnmounted(() => {
      clearTimeout(timer)
    })
    return {
      visible,
      IType,
      IContent,
      IIconType,
      offsetTop,
      close
    }
  }
})
</script>

<style lang="less" scoped>
@import "../style";
</style>
