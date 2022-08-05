<template>
  <transition name="confirm-fade">
    <div class="b-confirm" v-show="$props.visible">
      <!-- 头部标题 -->
      <div class="b-confirm-header">
        <slot name="header">
          <b-icon
            name="setting"
            :style="{ fontSize: '60px', color: 'red' }"
          ></b-icon>
        </slot>
        <b-icon name="close" class="b-close-icon" @click="close"></b-icon>
      </div>
      <!-- 内容区域 -->
      <div class="b-confirm-content">
        <slot>
          <div>删除后无法恢复，</div>
          <div>确定删除？</div>
        </slot>
      </div>
      <!-- 底部按钮 -->
      <div class="b-confirm-footer">
        <div class="b-confirm-btn">
          <b-button type="default" @click="close">取消</b-button>
          <b-button type="primary" @click="ok">确认</b-button>
        </div>
      </div>
    </div>
  </transition>
  <!-- 遮罩层 -->
  <div class="mask" v-show="$props.visible" @click="close"></div>
</template>

<script lang="ts">
import "../style/index.less";
import { defineComponent, PropType } from 'vue'
import BButton from '../../button/src/button.vue'
import BIcon from '../../icon/src/icon.vue'

export default defineComponent({
  name: 'BConfirm',
  components: { BButton, BIcon },
  props: {
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
