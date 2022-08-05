<template>
  <div class="demo-box">
    <b-button type="primary" @click="showMessage">
      click
      <template #icon>❌</template>
    </b-button>
    <b-checkbox v-model="checked"></b-checkbox>
    <b-input v-model="msg"/>
    <basic-select>
      555
    </basic-select>
    <b-drawer v-model:visible="checked"/>
  </div>
  <hr>
  <ListDemo/>
  <hr>
  <pagination-demo/>
  <hr>
  <tree-demo/>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import ListDemo from "./ListDemo.vue";
import {Message, Notice} from 'bdsaas-ui'
import PaginationDemo from "./PaginationDemo.vue";
import TreeDemo from "./TreeDemo.vue";

const checked = ref(true)
const msg = ref('2131')

function showMessage() {
  Message.info('hello')
  noticeHandle()
}

function noticeHandle() {
  Notice.handle({
    title: 'success',
    message: 'message',
    zIndex: 20000000,
    duration: 3000,
    offsetTop: 50,
    showClose: false
  })
}
</script>
<style lang="less">
.demo-box {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>
