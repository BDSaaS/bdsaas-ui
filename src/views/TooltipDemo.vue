<template>
  <div class="button-box">
    <b-tooltip placement="top" :disabled="false" effect="" :enterable="false">
      <template #content> <b>linessecondlinessecondlinessecondlinesecondlinessecondlinessecond  line</b>  </template>
      <b-button>上</b-button>
    </b-tooltip>
    <b-tooltip placement="top" :disabled="false" effect="light">
      <template #content> <b>linessecondlinessecondlinessecondlinesecondlinessecondlinessecond  line</b>  </template>
      <b-button>上</b-button>
    </b-tooltip>
    <b-tooltip placement="bottom">
      <template #content>linessecond</template>
      <b-button>下</b-button>
    </b-tooltip>
    <b-tooltip placement="bottom" effect="light">
      <template #content>linessecond</template>
      <b-button>下</b-button>
    </b-tooltip>
    <b-tooltip placement="left">
      <template #content> <b>linessecond linessecond line</b>  </template>
      <span style="display: inline-block; width: 50px; height: 120px; border: 1px solid red;">左</span>
    </b-tooltip>
    <b-tooltip placement="left" effect="light">
      <template #content> <b>linessecond linessecond line</b>  </template>
      <span style="display: inline-block; width: 50px; height: 120px; border: 1px solid red;">左</span>
    </b-tooltip>
    <b-tooltip placement="right">
      <template #content> <b>linessecond linessecond line</b>  </template>
      <b-button>右</b-button>
    </b-tooltip>
    <b-tooltip placement="right" effect="light">
      <template #content> <b>linessecond linessecond line</b>  </template>
      <b-button>右</b-button>
    </b-tooltip>
  </div>
</template>

<script lang="ts">
import BTooltip from '@/components/tooltip/src/tooltip.vue'
import BButton from '@/components/button/src/button.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { BTooltip, BButton },
  setup() {
    const msg = ref('kkkkkk')

    return {
      msg
    }
  }
})
</script>

<style lang="less" scoped>
.button-box {
  display: flex;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto;
}
</style>
