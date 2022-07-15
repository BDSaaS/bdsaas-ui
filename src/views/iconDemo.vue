<template>
  <div class="content">
    <ul class="list clearfix">
      <li class="item" v-for="(v, i) in modulesNames" :key="i">
        <b-icon :name="v" :size="size" :color="color"></b-icon>
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
      <input type="color" @change="setColor" />
    </div>
  </div>
</template>

<script lang="ts">
import BIcon from '@/components/icon/src/icon.vue'
import BButton from '@/components/button/src/button.vue'
import { ref } from 'vue'

export default {
  name: 'IconDemo',
  setup() {
    const modulesFiles = import.meta.glob('@/svgs/*.svg')
    const modulesNames = []
    for (const path in modulesFiles) {
      const splitArr = path.split('/')
      const fileName = splitArr[splitArr.length - 1].split('.')[0]
      modulesNames.push(fileName)
    }

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
  components: {
    BIcon,
    BButton
  }
}
</script>
<style scoped lang="less">
.content {
  width: 1200px;
  margin: 0 auto;

  .list {
    padding: 0;
    margin: 0;
  }

  .item {
    float: left;
    width: 200px;
    min-height: 120px;
    padding: 10px 0 0;
    text-align: center;
    border: 1px solid #eee;

    p {
      margin: 10px 0 0;
    }
  }
}
</style>
