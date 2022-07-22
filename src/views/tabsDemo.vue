<template>
  <p style="margin: 20px 0;">默认状态：</p>
  <b-tabs v-model="tabsValue1">
    <b-tab-pane label="全部订单" name="all">
      <div style="padding: 20px;">全部订单</div>
    </b-tab-pane>
    <b-tab-pane label="待付款" name="await">
      <div style="padding: 20px;">待付款</div>
    </b-tab-pane>
    <b-tab-pane label="待发货" name="fa">
      <div style="padding: 20px;">待发货</div>
    </b-tab-pane>
    <b-tab-pane label="已支付" name="payed">
      <div style="padding: 20px;">已支付</div>
    </b-tab-pane>
    <b-tab-pane label="呵呵了" name="hehe">
      <div style="padding: 20px;">呵呵了</div>
    </b-tab-pane>
  </b-tabs>
  <p style="margin: 20px 0;">card：</p>
  <b-tabs v-model="tabsValue2" type="card">
    <b-tab-pane label="全部订单" name="all">
      <div style="padding: 20px;">全部订单</div>
    </b-tab-pane>
    <b-tab-pane label="待付款" name="await">
      <div style="padding: 20px;">待付款</div>
    </b-tab-pane>
    <b-tab-pane label="待发货" name="fa">
      <div style="padding: 20px;">待发货</div>
    </b-tab-pane>
    <b-tab-pane label="已支付" name="payed">
      <div style="padding: 20px;">已支付</div>
    </b-tab-pane>
    <b-tab-pane label="呵呵了" name="hehe">
      <div style="padding: 20px;">呵呵了</div>
    </b-tab-pane>
  </b-tabs>
  <p style="margin: 20px 0;">card-space：</p>
  <b-tabs v-model="tabsValue3" type="card-space">
    <b-tab-pane label="全部订单" name="all">
      <div style="padding: 20px;">全部订单</div>
    </b-tab-pane>
    <b-tab-pane label="待付款" name="await">
      <div style="padding: 20px;">待付款</div>
    </b-tab-pane>
    <b-tab-pane label="待发货" name="fa">
      <div style="padding: 20px;">待发货</div>
    </b-tab-pane>
    <b-tab-pane label="已支付" name="payed">
      <div style="padding: 20px;">已支付</div>
    </b-tab-pane>
    <b-tab-pane label="呵呵了" name="hehe">
      <div style="padding: 20px;">呵呵了</div>
    </b-tab-pane>
  </b-tabs>
  <p style="margin: 20px 0;">自定义头部：</p>
  <b-tabs v-model="tabsValue4" type="card-space">
    <b-tab-pane name="add">
      <template #header="scope">
        <b-icon :name="scope.name" />{{ scope.name }}
      </template>
      <div style="padding: 20px;">add</div>
    </b-tab-pane>
    <b-tab-pane name="app">
      <template #header="scope">
        <b-icon :name="scope.name" />{{ scope.name }}
      </template>
      <div style="padding: 20px;">app</div>
    </b-tab-pane>
    <b-tab-pane name="approval">
      <template #header="scope">
        <b-icon :name="scope.name" />{{ scope.name }}
      </template>
      <div style="padding: 20px;">approval</div>
    </b-tab-pane>
    <b-tab-pane name="arrow-down-bold">
      <template #header="scope">
        <b-icon :name="scope.name" />{{ scope.name }}
      </template>
      <div style="padding: 20px;">arrow-down-bold</div>
    </b-tab-pane>
  </b-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BTabs from '@/components/tabs/src/tabs.vue'
import BTabPane from '@/components/tabs/src/tab-pane.vue'
import BIcon from '@/components/icon/src/icon.vue'

export default defineComponent({
  name: 'TabsDemo',
  setup() {
    const tabsValue1 = ref('all')
    const tabsValue2 = ref('all')
    const tabsValue3 = ref('all')
    const tabsValue4 = ref('add')

    return {
      tabsValue1,
      tabsValue2,
      tabsValue3,
      tabsValue4
    }
  },
  components: {
    BTabs,
    BTabPane,
    BIcon
  }
})
</script>
