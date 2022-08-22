<template>
  <b-drawer
    title="我是标题111111111111111111111111111111111111111111111"
    v-model:visible="show"
    width="50%"
    :beforeClose="beforeClose"
  >
    <div style="height: 1000px; background: red;"></div>
    123
  </b-drawer>

  <p @click="show = true">点击</p>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'DrawerDemo',
  setup() {
    let show = ref(false)

    function beforeClose(done:Function){
      setTimeout(() => {
        done()
      }, 1000)
    }


    return {
      show,
      beforeClose
    }
  }
})
</script>
