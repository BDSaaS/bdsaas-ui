<template>
  <b-button @click="success">成功</b-button>
  <b-button @click="info">信息</b-button>
  <b-button @click="warn">警告</b-button>
  <b-button @click="fail">错误</b-button>
</template>

<script lang="ts" setup>
import {Message1} from "bdsaas-ui/src";
const success = () => { Message1('请求成功了!') }
const info = () => { Message1({ type: 'info', message: '某人发送了一条信息', iconType: 'circular' }) }
const warn = () => { Message1({ type: 'warn', message: '漏水了!' }) }
const fail = () => { Message1({ type: 'error', message: '宕机了!' }) }
</script>

<style scoped>

</style>
