<template>
  <b-checkbox v-model="checked" label="Hello world"></b-checkbox>
  <br />
  <b-checkbox v-model="checked" disabled>Hello world</b-checkbox>
  <p>选中状态：{{ checked }}</p>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import BCheckbox from '../components/checkbox/src/checkbox.vue'

export default defineComponent({
  name: 'CheckboxDemo',
  components: { BCheckbox },
  setup() {
    const checked = ref(true)

    return { checked }
  }
})
</script>
