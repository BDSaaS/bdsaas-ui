<template>
  <div>
    <transition name="confirm-fade">
      <div v-show="show" class="confirm">
        <i class="icon" v-if="showClose" @click="$emit('cancel')"></i>
        <main>
          <i class="tip-icon"></i>
          <p>删除后无法恢复!</p>
          <p>{{ content }}</p>
        </main>
        <div class="footer">
          <b-button @click="$emit('cancel')" type="default">取消</b-button>
          <b-button @click="$emit('ok')" type="primary">确认</b-button>
        </div>
      </div>
    </transition>
    <div v-show="show" class="mask" @click="$emit('cancel')"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import BButton from '../../button/src/button.vue'
export default defineComponent({
  name: 'confirm1',
  components: { BButton },
  props: {
    // 关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // tip
    content: {
      type: String,
      default: ''
    }
  },
  setup() {
    // 显示
    const show = ref(false)
    onMounted(() => {
      show.value = true
    })
    return {
      show
    }
  }
})
</script>

<style lang="less" scoped>
@import "../style";
</style>
