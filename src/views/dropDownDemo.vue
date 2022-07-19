<template>
  <p>一般用法：</p>
  <b-drop-down v-model="selected1" :options="options1" />
  <p>点击触发：</p>
  <b-drop-down v-model="selected2" :options="options1" trigger="click" />
  <p>禁用状态：</p>
  <b-drop-down v-model="selected3" :options="options1" disabled />
  <p>带禁用项：</p>
  <b-drop-down v-model="selected4" :options="options2" />
  <p>带分割线：</p>
  <b-drop-down v-model="selected5" :options="options3" />
  <p>可清空：</p>
  <b-drop-down v-model="selected6" :options="options1" clearable />
  <p>收起状态：</p>
  <b-drop-down v-model="selected7" :options="options1" omit />
  <p>默认插槽：</p>
  <b-drop-down
    v-model="selected8"
    :options="options1"
    trigger="click"
    @change="changeHandle"
  >
    <b-drop-down-menu>
      <b-drop-down-menu-item
        v-for="(item, index) of options2"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      ></b-drop-down-menu-item>
    </b-drop-down-menu>
  </b-drop-down>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BDropDown from '@/components/dropDown/src/dropDown.vue'
import BDropDownMenu from '@/components/dropDown/src/dropDown-menu.vue'
import BDropDownMenuItem from '@/components/dropDown/src/dropDown-menu-item.vue'

export default defineComponent({
  name: 'DropDownDemo',
  components: { BDropDown, BDropDownMenu, BDropDownMenuItem },
  setup() {
    const selected1 = ref(null)
    const selected2 = ref('1')
    const selected3 = ref('1')
    const selected4 = ref('1')
    const selected5 = ref('1')
    const selected6 = ref('1')
    const selected7 = ref('1')
    const selected8 = ref('1')
    const options1 = ref([
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二' },
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四' },
      { value: '5', label: '选项五' },
      { value: '6', label: '选项六' }
    ])
    const options2 = ref([
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二', disabled: true },
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四' },
      { value: '5', label: '选项五' },
      { value: '6', label: '选项六' }
    ])
    const options3 = ref([
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二', divided: true },
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四' },
      { value: '5', label: '选项五' },
      { value: '6', label: '选项六' }
    ])

    return {
      selected1,
      selected2,
      selected3,
      selected4,
      selected5,
      selected6,
      selected7,
      selected8,
      options1,
      options2,
      options3
    }
  }
})
</script>
