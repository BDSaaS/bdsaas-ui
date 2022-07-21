<template>
  <b-drawer
    title="我是标题111111111111111111111111111111111111111111111"
    v-model:visible="show"
  >
    <div style="height: 1000px; background: red;"></div>
    123
  </b-drawer>

  <p @click="show = true">点击</p>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import BDrawer from '../components/drawer/src/drawer.vue'

export default defineComponent({
  name: 'DrawerDemo',
  components: { BDrawer },
  setup() {
    let show = ref(false)

    return {
      show
    }
  }
})
</script>
