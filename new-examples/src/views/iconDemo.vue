<template>
  <div class="content">
    <h2>使用示例： {{
        '<b-icon name="add"/>'
      }} <b-icon name="add"/></h2>
    <ul class="list clearfix">
      <li v-for="(v, i) in modulesNames" :key="i" class="item">
        <b-icon :name="v" :style="{'fontSize': size + 'px','color': color}"/>
        <p>{{ v }}</p>
      </li>
    </ul>
    <div style="margin-top: 20px;">
      尺寸：
      <b-button type="default" @click="setSize(14)">14</b-button>
      <b-button type="default" @click="setSize(28)">28</b-button>
      <b-button type="default" @click="setSize(56)">56</b-button>
    </div>
    <div style="margin-top: 20px;">
      颜色：
      <input type="color" @change="setColor"/>
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue'

export default {
  name: 'IconDemo',
  setup() {
    const modulesNames = ['add', 'app', 'approval', 'arrow-down-bold', 'arrow-down-filling', 'arrow-left-bold', 'arrow-left-filling', 'arrow-right-bold', 'arrow-right-filling', 'arrow-up-bold', 'arrow-up-filling', 'bag', 'close', 'customer', 'disk', 'edit', 'error', 'finance', 'home', 'location', 'market', 'more', 'order', 'output', 'person', 'project', 'salary', 'sales', 'search', 'select', 'sell', 'setting', 'work']

    const color = ref('#000')

    const size = ref(28)

    const setSize = (val: number) => {
      size.value = val
    }

    const setColor = (e: any) => {
      color.value = e.target.value
    }

    return {
      modulesNames,
      color,
      size,
      setSize,
      setColor
    }
  },
}
</script>
<style scoped lang="less">
.blue-30 {
  font-size: 30px;
  color: blue;
}

.content {
  width: 1200px;
  margin: 0 auto;

  .list {
    padding: 0;
    margin: 0;
  }

  .item {
    float: left;
    width: 150px;
    height: 150px;
    padding: 10px 0 0;
    text-align: center;
    border: 1px solid #eee;

    p {
      margin: 10px 0 0;
    }
  }
}
</style>
