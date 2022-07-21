<template>
  <p style="margin: 20px 0;">一般用法：</p>
  <b-select v-model="selected1" :options="options1" />
  <p style="margin: 20px 0;">禁用状态：</p>
  <b-select v-model="selected2" :options="options1" disabled clearable />
  <p style="margin: 20px 0;">可清空：</p>
  <b-select v-model="selected3" clearable>
    <b-option v-for="(item, index) of options1" :key="index" :obj="item" />
  </b-select>
  <p style="margin: 20px 0;">带禁用项（传入options）：</p>
  <b-select v-model="selected4" :options="options2"></b-select>
  <p style="margin: 20px 0;">带禁用项（不传options）：</p>
  <b-select v-model="selected5">
    <b-option v-for="(item, index) of options2" :key="index" :obj="item" />
  </b-select>
  <p style="margin: 20px 0;">没有边框：</p>
  <b-select
    v-model="selected6"
    :options="options1"
    :border="false"
    clearable
  ></b-select>
  <p style="margin: 20px 0;">多选：</p>
  <b-select v-model="selected7" :options="options1" multiple></b-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Options } from '@/components/select/src/interface'
import BSelect from '@/components/select/src/select.vue'
import BOption from '@/components/select/src/option.vue'

export default defineComponent({
  name: 'SelectDemo',
  components: { BOption, BSelect },
  setup() {
    const selected1 = ref('1')
    const selected2 = ref('1')
    const selected3 = ref('1')
    const selected4 = ref('1')
    const selected5 = ref('1')
    const selected6 = ref('1')
    const selected7 = ref(['1', '2'])
    const options1 = ref<Options>([
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二' },
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四' },
      { value: '5', label: '选项五' },
      { value: '6', label: '选项六' }
    ])
    const options2 = ref<Options>([
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二', disabled: true },
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四' },
      { value: '5', label: '选项五' },
      { value: '6', label: '选项六' }
    ])

    const visible = ref(false)

    return {
      visible,
      selected1,
      selected2,
      selected3,
      selected4,
      selected5,
      selected6,
      selected7,
      options1,
      options2
    }
  }
})
</script>
