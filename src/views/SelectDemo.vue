<template>
  <p>一般用法：</p>
  <b-select v-model="selected" :options="options1" />
  <p>禁用状态：</p>
  <b-select v-model="selected" :options="options1" disabled clearable />
  <p>可清空：</p>
  <b-select v-model="selected2" clearable>
    <b-option
      v-for="(item, index) of options1"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </b-select>
  <p>带禁用项（传入options）：</p>
  <b-select v-model="selected3" :options="options2"></b-select>
  <p>带禁用项（不传options）：</p>
  <b-select v-model="selected4">
    <b-option
      v-for="(item, index) of options2"
      :key="index"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </b-select>
  <p>没有边框：</p>
  <b-select v-model="selected5" :options="options1" :border="false"></b-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Options } from '@/components/select/src/interface'
import BSelect from '@/components/select/src/select.vue'
import BOption from '@/components/select/src/options.vue'

export default defineComponent({
  name: 'SelectDemo',
  components: { BOption, BSelect },
  setup() {
    const selected = ref('1')
    const selected2 = ref('1')
    const selected3 = ref('1')
    const selected4 = ref('1')
    const selected5 = ref('1')
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
      selected,
      selected2,
      selected3,
      selected4,
      selected5,
      options1,
      options2
    }
  }
})
</script>
