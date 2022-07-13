<template>
  <div class="b-pag-box">
    <!-- 是否禁用 判断当前页码是否是 等于 1 -->
    <a
      class="b-right-arrow b-outside-border"
      :class="{ disabled: isCurrentPage <= 1 }"
      @click="changePage(isCurrentPage - 1)"
      href="javascript:;"
    >
      &lt;
    </a>
    <!-- 是否显示 判断起始页码是否 大于 1 -->
    <span class="b-page-size b-outside-border" v-if="pager.start > 1">...</span>
    <a
      class="b-page-size b-outside-border"
      v-for="i in pager.btnArr"
      :key="i"
      href="javascript:;"
      :class="{ active: i === isCurrentPage }"
      @click="changePage(i)"
      >{{ i }}</a
    >
    <!-- 是否显示 判断 结束页码 是否 小于总页数 -->
    <span
      class="b-page-size b-outside-border"
      v-if="pager.end < pager.pageCount"
      >...</span
    >
    <a
      class="b-right-arrow b-outside-border"
      :class="{ disabled: isCurrentPage >= pager.pageCount }"
      href="javascript:;"
      @click="changePage(isCurrentPage + 1)"
    >
      >
    </a>
    <div
      class="b-page-num b-num-out-size-border"
      @click="openPageNum = !openPageNum"
    >
      <div class="b-text-page-num">
        <span>10</span>
        <span>条/页</span>
      </div>
      <img
        class="b-page-num-icon"
        :src="
          openPageNum
            ? '../../../../public/编组 29.png'
            : '../../../../public/编组 28.png'
        "
        alt=""
      />
      <div class="b-select-dropdown b-popper" v-show="openPageNum">
        <div
          class="b-select-dropdown-item"
          v-for="(item, index) in [10, 20, 30]"
          :key="item"
          @click="changePages(index)"
        >
          <span>{{ item }}</span>
          <span>条/页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch, reactive, computed, withDefaults } from 'vue'

// 导入接口
import { pageType, pageDataType } from './interface'

const prors = withDefaults(defineProps<pageType>(), {
  total: 100,
  currentPage: 1,
  pageSize: 10
})

// 响应式数据绑定
const pageData = reactive<pageDataType>({
  // 总条数
  isTotal: 100,
  // 当前页码
  isCurrentPage: 1,
  // 每页几条数据
  isPageSize: 10,
  // 按钮的个数
  btnCount: 5,
  // 打开页码列表
  openPageNum: false
})
const { isTotal, isCurrentPage, isPageSize, btnCount, openPageNum } =
  toRefs(pageData)
// 监听传入的数据
watch(prors, () => {
  isTotal.value = prors.total
  isCurrentPage.value = prors.currentPage
  isPageSize.value = prors.pageSize
})

// * 根据上述数据得到（总页数，起始页码，结束页码，按钮数组）
const pager = computed(() => {
  // 计算总页数
  const pageCount = Math.ceil(isTotal.value / isPageSize.value)
  // 计算起始页码 和 结束页码
  // 1 - 理想情况 - 根据当前页码个数可得到
  let start = isCurrentPage.value - Math.floor(btnCount.value / 2)
  let end = start + btnCount.value - 1
  // 2.1 - 如果起始页码小于1，需要重新计算
  if (start < 1) {
    start = 1
    end =
      start + btnCount.value - 1 > pageCount
        ? pageCount
        : start + btnCount.value - 1
  }
  // 2.2 - 如果结束页码大于总页数，需要重新计算
  if (end > pageCount) {
    end = pageCount
    start = end - btnCount.value + 1 < 1 ? 1 : end - btnCount.value + 1
  }

  // 处理完毕 start 和 end 得到按钮数组
  const btnArr = []
  for (let i = start; i <= end; i++) {
    btnArr.push(i)
  }
  return {
    pageCount,
    start,
    end,
    btnArr
  }
})

const changePages = (index: number) => {
  console.log(index)
}

// 定义一个自定义事件 向父传参
const emit = defineEmits(['current-change'])

// 改变页码
const changePage = (newPage: number) => {
  isCurrentPage.value = newPage
  if (isCurrentPage.value < 1) {
    isCurrentPage.value = 1
  } else if (isCurrentPage.value > pager.value.pageCount) {
    isCurrentPage.value = pager.value.pageCount
  }
  // 通知父组件最新页码
  emit('current-change', newPage)
}
</script>

<script lang="ts">
export default {
  name: 'BPagination'
}
</script>

<style scoped lang="less">
@import "../style/pagination";
</style>
