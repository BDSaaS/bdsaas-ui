<template>
  <label class="b-radios">
    <radio v-model="radioValue" label="sss"></radio>
    <radio v-model="radioValue" label="sss1"></radio>
    <radio v-model="radioValue" label="sss2"></radio>
    当前值：{{ radioReadonly }} 选中后值：{{ radioValue }}
  </label>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import radio from '@/components/radio'
export default defineComponent({
  name: 'radioDemo',
  setup() {
    const radioReadonly = 'sss2'
    const radioValue = ref(radioReadonly)
    return {
      radioValue,
      radioReadonly
    }
  },
  components: {
    radio
  }
})
</script>
