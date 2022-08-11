<template>
  <div>
    <span @click="noticeHandle">notice</span>
    <!-- options: title：标题,message：内容, zIndex: 层级, duration：动画时间,offsetTop: 距离窗口顶部距离, showClose:是否显示关闭按钮-->
    <!--
          默认使用方式：
          Notice.handle({
            title: 'success',
            message: 'message',
            zIndex: 20000000,
            duration: 3000,
            offsetTop: 50,
            showClose: false
          })
    -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import {Notice} from 'bdsaas-ui'
export default defineComponent({
  setup() {
    function noticeHandle() {
      Notice.handle({
        title: 'success',
        message: 'message',
        zIndex: 20000000,
        duration: 3000,
        offsetTop: 50,
        showClose: false
      })
    }
    return {
      noticeHandle
    }
  }
})
</script>
