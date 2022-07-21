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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BTabs from '@/components/tabs/src/tabs.vue'
import BTabPane from '@/components/tabs/src/tab-pane.vue'

export default defineComponent({
  name: 'TabsDemo',
  setup() {
    const tabsValue1 = ref('all')
    const tabsValue2 = ref('all')
    const tabsValue3 = ref('all')

    return {
      tabsValue1,
      tabsValue2,
      tabsValue3
    }
  },
  components: {
    BTabs,
    BTabPane
  }
})
</script>
