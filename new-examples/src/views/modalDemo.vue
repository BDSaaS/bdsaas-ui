<template>
  <div>
    <b-button type="default" @click="showModal">Open Modal</b-button>
    <b-modal
      :visible="visible"
      title="我是父组件自定义的标题"
      @submit="handleOk"
      @cancel="toggle"
    >
      <!-- <template #title>
            <div>
                <span>提示</span>
                <br>
                <span>2022.0222</span>
            </div>
        </template> -->
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <!-- <template #footer>
                <div>
                    <b-button type="default" @click="visible = false">自定义按钮</b-button>
                </div>
            </template> -->
    </b-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'modalDemo',
  setup() {
    const visible = ref<boolean>(false)
    const handleOk = () => {
      visible.value = false
      // 确认的回调
      console.log('确认了')
    }
    const toggle = () => {
      visible.value = false
      // 关闭的回调
      console.log('取消了')
    }
    const showModal = () => {
      visible.value = true
    }
    return {
      visible,
      showModal,
      toggle,
      handleOk
    }
  }
})
</script>
