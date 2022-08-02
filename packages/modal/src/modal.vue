<template>
  <transition name="modal-fade">
    <div class="b-modal-container" v-show="$props.visible">
      <!-- 头部标题 -->
      <div class="b-modal-header">
        <div class="b-modal-header-title">
          <!--具名插槽内容优先级会高于 props-->
          <slot name="title">
            <span>{{ title }}</span>
          </slot>
        </div>
        <b-icon name="close" class="b-close-icon" @click="close"></b-icon>
      </div>
      <!-- 内容区域 -->
      <div class="b-modal-content">
        <slot></slot>
      </div>
      <!-- 底部按钮 -->
      <div class="b-modal-footer">
        <div class="b-modal-btn">
          <slot name="footer">
            <b-button type="default" @click="close">取消</b-button>
            <b-button type="primary" @click="ok">确认</b-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
  <!-- 遮罩层 -->
  <div class="mask" v-show="$props.visible" @click="close"></div>
</template>

<script lang="ts">
import BButton from '@/components/button/src/button.vue'
import BIcon from '@/components/icon/src/icon.vue'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'BModal',
  components: { BButton, BIcon },
  props: {
    // 模态框标题
    title: {
      type: String as PropType<string>,
      default: '标题'
    },
    visible: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['cancel', 'update:visible', 'submit'],
  setup(props, { emit }) {
    // 取消
    const close = () => {
      emit('cancel')
      emit('update:visible', false)
    }
    // 确认
    const ok = () => {
      emit('submit')
      emit('update:visible', false)
    }
    return {
      close,
      ok
    }
  }
})
</script>

<style scoped lang="less">
@import "../style/modal.less";
</style>
