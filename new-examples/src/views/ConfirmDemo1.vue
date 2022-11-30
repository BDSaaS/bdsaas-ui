<template>
  <b-button @click="show">提示弹窗</b-button>
  <b-button @click="hidex">不显示icon</b-button>
</template>

<script lang="ts">
import {Confirm1} from "bdsaas-ui/src";
export default {
  name: "ConfirmDemo1",
  setup() {
    const show = async () => {
      Confirm1({content: '是否删除通用标题共一个组件?'}).then(res => {
        console.log('成功了', res)
      }).catch(error => {
        console.log('失败了', error)
      })
    }
    const hidex = () => {
      Confirm1({showClose: false, content: '离离原上草，离离原上谱!'}).then(res => {
        console.log('成功了', res)
      }).catch(error => {
        console.log('失败了', error)
      })
    }
    return {
      show,
      hidex
    }
  }
}
</script>

<style scoped>

</style>
