<template>
  <div class="b-badge-box">
    <b-badge :value="content" :is-dot="isDot" :max="max">
      <b-button>按钮</b-button>
    </b-badge>
    <div>
      <b-button @click="content++">数量+</b-button>
      <b-button @click="content--">数量-</b-button>
      <b-button @click="changeIsdot">isDot</b-button>
      <b-button @click="changeMax">最大值99</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BButton from '@/components/button/src/button.vue'
import BBadge from '@/components/badge/src/BBadge.vue'

export default defineComponent({
  name: 'badgeDemo',
  components: { BBadge, BButton },
  setup() {
    const content = ref<number>(5)
    const isDot = ref<boolean>(false)
    const max = ref<number>(99)
    const changeIsdot = () => {
      isDot.value = !isDot.value
    }
    const changeMax = () => {
      content.value = 100
    }
    return { content, isDot, max, changeIsdot, changeMax }
  }
})
</script>

<style scoped lang="less">
.b-badge-box {
  display: flex;
  width: 800px;
  height: 300px;
  margin: 100px auto;

  & > div {
    margin-left: 100px;
  }
}
</style>
