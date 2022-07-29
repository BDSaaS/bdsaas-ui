<template>
  <p style="margin: 20px 0;">一般用法：</p>
  <b-drop-down v-model="selected1" :options="options1" />
  <p style="margin: 20px 0;">点击触发：</p>
  <b-drop-down v-model="selected2" :options="options1" trigger="click" />
  <p style="margin: 20px 0;">禁用状态：</p>
  <b-drop-down v-model="selected3" :options="options1" disabled />
  <p style="margin: 20px 0;">带禁用项：</p>
  <b-drop-down v-model="selected4" :options="options2" />
  <p style="margin: 20px 0;">带分割线：</p>
  <b-drop-down v-model="selected5" :options="options3" />
  <p style="margin: 20px 0;">可清空：</p>
  <b-drop-down v-model="selected6" :options="options1" clearable />
  <p style="margin: 20px 0;">收起状态：</p>
  <b-drop-down v-model="selected7" :options="options1" omit />
  <p style="margin: 20px 0;">默认插槽：</p>
  <b-drop-down v-model="selected8">
    <b-drop-down-menu>
      <b-drop-down-menu-item
        v-for="(item, index) of options2"
        :key="index"
        :obj="item"
      ></b-drop-down-menu-item>
    </b-drop-down-menu>
  </b-drop-down>
  <p style="margin: 20px 0;">含有children：</p>
  <b-drop-down v-model="selected9" :options="options4" trigger="click">
    <template #children-item="scope">
      <div
        style="
          padding: 0 12px;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
"
        :style="{
          color: childrenSelected === scope.row.value ? '#0056ff' : 'inherit'
        }"
        @click.stop="childrenItemClickHandler(scope.row)"
      >
        {{ scope.row.label }}
      </div>
    </template>
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
    const selected1 = ref()
    const selected2 = ref('1')
    const selected3 = ref('1')
    const selected4 = ref('1')
    const selected5 = ref('1')
    const selected6 = ref('1')
    const selected7 = ref('1')
    const selected8 = ref('1')
    const selected9 = ref('6')
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
    const options4 = ref([
      { value: '1', label: '选项一' },
      { value: '5', label: '选项五' },
      {
        value: '6',
        label: '选项六',
        children: [
          {
            value: '6-1',
            label: '选项六-1'
          },
          {
            value: '6-2',
            label: '选项六-2'
          },
          {
            value: '6-3',
            label: '选项六-3'
          },
          {
            value: '6-4',
            label: '选项六-4'
          }
        ]
      }
    ])
    const childrenSelected = ref('')
    function childrenItemClickHandler(row: any) {
      childrenSelected.value = row.value
    }

    return {
      selected1,
      selected2,
      selected3,
      selected4,
      selected5,
      selected6,
      selected7,
      selected8,
      selected9,
      options1,
      options2,
      options3,
      options4,
      childrenSelected,
      childrenItemClickHandler
    }
  }
})
</script>
