<template>
  <label class="b-radios">
    <b-radio v-model="radioValue" label="sss1"></b-radio>
    <b-radio v-model="radioValue" label="sss"></b-radio>
    <b-radio v-model="radioValue" label="sss2"></b-radio>
    当前值：{{ radioReadonly }} 选中后值：{{ radioValue }}
  </label>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
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
})
</script>
