<template>
  <div>
    <span @click="noticeInfo">info</span>|
    <span @click="noticeError">error</span>|
    <span @click="noticeWarn">warn</span>|
    <span @click="noticeSuccess">success</span>
    <!-- options: type：'success', 'info', 'warn', 'error', text：描述,zIndex: 层级, duration：动画时间,offsetTop: 距离窗口顶部距离, showClose:是否显示关闭按钮, center: 文字是否居中 -->
    <!--
          默认使用方式：
          Message.handle({
             type: 'info',
             text: 'message',
             zIndex: 20000,
             duration: 3000,
             offsetTop: 100,
             showClose: true,
             center: true,
          })
          Message.handle('sssss')
          默认使用方式：
          Message.info({
             text: 'message',
             zIndex: 20000,
             duration: 3000,
             offsetTop: 100,
             showClose: true,
             center: true,
          })
          Message.info('sssss')
    -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import {Message} from 'bdsaas-ui'
export default defineComponent({
  setup() {
    function noticeInfo() {
      Message.info('dddd d')
    }

    function noticeError() {
      Message.error({
        text: 'ssss'
      })
    }

    function noticeWarn() {
      Message.warn({
        text: 'message',
        zIndex: 11111112,
        duration: 3000,
        showClose: true,
        center: true
      })
    }
    function noticeSuccess() {
      // Message.handle({
      //   type: 'success',
      //   text: 'message',
      //   zIndex: 20000,
      //   duration: 3000,
      //   offsetTop: 100,
      //   showClose: true,
      //   center: true,
      // })
      Message.handle('ddddd')
    }
    return {
      noticeInfo,
      noticeError,
      noticeWarn,
      noticeSuccess
    }
  }
})
</script>
