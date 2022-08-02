<script setup lang="ts">
import { computed, ref } from 'vue'
import BButton from '../packages/button/src/button.vue'

const props = defineProps<{ count: number }>()

const times = ref(2)
const result = computed(() => props.count * times.value)

defineExpose(props)
</script>

<template>
  <div>{{ count }} x {{ times }} = {{ result }}</div>
  <b-button type="default" @click="times += 1">times: {{ times }}</b-button>
</template>
