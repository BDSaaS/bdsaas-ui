<template>
  <div class="button-box">
    <b-button
      wrapper-class="button-wrapper"
      :size="size"
      :type="type"
      :round="round"
      :disabled="disabled"
      @click="btnHandler"
      icon="select"
    >
      Hello
    </b-button>
    <b-button
      :size="size"
      :type="type"
      :round="round"
      :disabled="disabled"
    >
      World
      <template #icon>
        <b-icon name="add" />
      </template>
    </b-button>
  </div>

  <div class="box">
    <b-button type="default" @click="setConfig('size')">设置尺寸</b-button>
    <b-button type="default" @click="setConfig('type')">设置类型</b-button>
    <b-button type="default" @click="setConfig('round')">设置圆角</b-button>
    <b-button type="default" @click="setConfig('disabled')">设置禁用 </b-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, unref } from 'vue'
import type { Ref } from 'vue'
import type { ButtonSize, ButtonType } from 'bdsaas-ui/src/button/types'

type ArgType = 'size' | 'type' | 'round' | 'disabled'

interface BtnConfig {
  size: ButtonSize
  type: ButtonType
  round: boolean
  disabled: boolean
}

const btnConfig = reactive<BtnConfig>({
  size: 'default',
  type: 'primary',
  round: true,
  disabled: false
})
const configAsRefs = toRefs(btnConfig)

const { size, type, round, disabled } = configAsRefs

function setValue<T, U extends T>(data: Ref<T>, value: U) {
  data.value = value
}

const setHandler = {
  size: () =>
    setValue<ButtonSize, ButtonSize>(
      size,
      unref(size) === 'default' ? 'small' : 'default'
    ),
  type: () =>
    setValue<ButtonType, ButtonType>(
      type,
      unref(type) === 'primary' ? 'default' : 'primary'
    ),
  round: () => setValue<boolean, boolean>(round, !unref(round)),
  disabled: () => setValue<boolean, boolean>(disabled, !unref(disabled))
}

function setConfig(type: ArgType) {
  setHandler[type]()
}

function btnHandler() {
  console.log(999)
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin: 50px auto;
}

.button-box {
  display: flex;
  justify-content: space-between;
  width: 420px;
  margin: 0 auto;
}
</style>
