<template>
  <ul class="menu">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BDropDownMenu'
})
</script>
