<template>
  <div class="xw">
    <span>s</span>
    <span>w</span>
  </div>
  <b-button type="primary" @click="showConfirm">打开confirm</b-button>
  <b-confirm :visible="visible" @submit="handleOk" @cancel="toggle">
    <template #header>
      <div>
        <b-icon
          name="error"
          :style="{ fontSize: '60px', color: 'red' }"
        ></b-icon>
      </div>
    </template>
    <!-- <template #default>
        <div>
          这是一个错误！
        </div>
        <div>
          改吧~兄弟
        </div>
      </template> -->
  </b-confirm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BButton from '@/components/button/src/button.vue'
import BIcon from '@/components/icon/src/icon.vue'
import BConfirm from '@/components/confirm/src/BConfirm.vue'
export default defineComponent({
  name: 'confirmDemo',
  components: { BConfirm, BButton, BIcon },
  setup() {
    const visible = ref<boolean>(false)
    // 打开confirm
    const showConfirm = () => {
      visible.value = true
    }
    // 确认的回调
    const handleOk = () => {
      visible.value = false
    }
    // 取消的回调
    const toggle = () => {
      visible.value = false
    }
    return {
      visible,
      showConfirm,
      handleOk,
      toggle
    }
  }
})
</script>
<style lang="less" scoped>
.xw {
  color: @mainColor;
  .flex-column-mixin(column, center, center);
}
</style>
