<template>
  <div class="b-notice b-notice-hide" :style="`zIndex:${zIndex};`">
    <div class="b-notice-title">
      <svg
        class="b-icon b-icon-notice"
        aria-hidden="true"
        width="1em"
        height="1em"
      >
        <use href="#b-icon-notice" />
      </svg>
      {{ title }}
    </div>
    <div class="b-notice-message">
      {{ message }}
    </div>
    <svg
      class="b-icon b-notice-close"
      aria-hidden="true"
      width="1em"
      height="1em"
      v-show="showClose"
      @click="handleClose"
    >
      <use href="#b-icon-close" />
    </svg>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'notice-components',
  props: {
    type: String,
    title: String,
    message: String,
    position: String,
    zIndex: Number,
    showClose: Boolean
  },
  setup(props) {
    console.log(props)
    const handleClose = () => {
      console.log(1)
    }
    return {
      handleClose
    }
  }
})
</script>
<style lang="less" scoped>
@import "../style/notice.less";
</style>
