<template>
  <b-checkbox v-model="checked" label="Hello world"></b-checkbox>
  <br />
  <b-checkbox v-model="checked" disabled>Hello world</b-checkbox>
  <p>选中状态：{{ checked }}</p>
  <hr />
  <b-button @click="indeterminate = !indeterminate">切换半选中状态</b-button>
  <br />
  <br />
  <b-checkbox v-model="checked2" v-model:indeterminate="indeterminate"
    >Hello world {{ checked2 }}
  </b-checkbox>
  <p>半选中状态：{{ indeterminate }}</p>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'

const checked = ref(true)
const checked2 = ref(false)
const indeterminate = ref(true) as Ref<boolean>
</script>
