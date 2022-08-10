<template>
  <div class="demo-box">
    <b-input v-model="myInput" type="text" placeholder="单个input"/>
    <hr>
    <b-form ref="login" :rules="loginValidatorRules" :formData="loginForm" :label-display="false">
      <b-form-item field="account">
        <b-input v-model="loginForm.account" type="text" placeholder="手机号"/>
      </b-form-item>
      <b-form-item field="password">
        <b-input v-model="loginForm.password" type="password" placeholder="密码"/>
      </b-form-item>
      <b-button>按钮</b-button>
    </b-form>
    <hr>
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
import {ref, reactive, toRefs} from 'vue'
import ListDemo from './ListDemo.vue'
import {Message, Notice} from 'bdsaas-ui'
import PaginationDemo from './PaginationDemo.vue'
import TreeDemo from './TreeDemo.vue'

const myInput = ref()
const loginForm = reactive({
  account: '',
  password: '',
})
const loginValidatorRules = {
  account: [
    {
      required: true,
      message: '账户不得为空',
      trigger: 'blur',
    },
    {
      phone: true,
      message: '请输入正确的手机号',
      trigger: 'input',
    }],
  password: [
    {
      required: true,
      message: '密码不得为空',
      trigger: 'blur',
    },
    {
      min: 6,
      message: '密码不少于6位',
      trigger: 'blur',
    }],
}

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
