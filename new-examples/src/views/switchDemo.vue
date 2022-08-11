<template>
  <div class="b-switch-box">
    <b-switch v-model:checked="checked" :disabled="disabled" @change="change">
    </b-switch>
    <p>
      {{ checked }}
    </p>
    <b-button @click="setDisabled">禁用</b-button>
    <b-button @click="delDisabled">解除</b-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'switchDemo',
  setup() {
    const checked = ref<boolean>(false)
    const disabled = ref<boolean>(false)
    const setDisabled = () => {
      disabled.value = true
    }
    const delDisabled = () => {
      disabled.value = false
    }
    const change = (val: boolean) => {
      console.log(val)
    }
    return {
      checked,
      disabled,
      setDisabled,
      delDisabled,
      change
    }
  }
})
</script>
<style lang="less" scoped>
.b-switch-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: bisque;

  > p {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
