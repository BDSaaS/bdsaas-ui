<template>
  <p>展开状态：{{ visible }}</p>
  <b-select
    v-model="selected"
    :options="options"
    @visible-change="getVisible"
  />
  <p>选中的值：{{ selected }}</p>
  <b-select v-model="selected2" @visible-change="getVisible">
    <b-option
      v-for="(item, index) of options"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </b-select>
  <p>选中的值：{{ selected2 }}</p>
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

    const options = ref<Options>([
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二' },
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四' },
      { value: '5', label: '选项五' },
      { value: '6', label: '选项六' }
    ])

    const visible = ref(false)

    function getVisible(val: boolean) {
      visible.value = val
    }

    return {
      visible,
      selected,
      selected2,
      options,
      getVisible
    }
  }
})
</script>
