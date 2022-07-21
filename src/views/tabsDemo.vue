<template>
  <b-tabs></b-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BTabs from '@/components/tabs/src/tabs.vue'

export default defineComponent({
  name: 'TabsDemo',
  components: {
    BTabs
  }
})
</script>
