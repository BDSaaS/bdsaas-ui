<template>
  <p>msg 的值：{{ msg }}</p>
  <div>
    搜索框：
    <b-input v-model="msg" type="search"></b-input>
  </div>
  <hr />
  <div>
    普通框：
    <b-input v-model="msg"></b-input>
  </div>
  <hr />
  <div>
    插槽框：
    <b-input v-model="msg" @change="changeHandler">
      <template #suffix>
        <i class="iconfont icon-xiajiantou"></i>
      </template>
    </b-input>
  </div>
  <hr />
  <div>
    密码框：
    <b-input v-model="msg" type="password"></b-input>
  </div>
  <hr />
  <div>
    禁用框：
    <b-input v-model="msg" disabled></b-input>
  </div>
  <hr />
  <div>
    只读框：
    <b-input v-model="msg" readonly></b-input>
  </div>
  <hr />
  <div>
    报错框：
    <b-input v-model="msg" is-error></b-input>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import BInput from '@/components/input/src/input.vue'

export default defineComponent({
  name: 'InputDemo',
  components: { BInput },
  setup() {
    const msg = ref('Hello world!')

    function changeHandler(val: any) {
      console.log(val, 'line 54')
    }

    return { msg, changeHandler }
  }
})
</script>
