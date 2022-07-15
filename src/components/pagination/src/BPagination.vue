<template>
  <div class="b-pag-box">
    <!-- 上一页 -->
    <a
      class="b-right-arrow b-outside-border"
      :class="{ disabled: currentPageNum <= 1 }"
      @click="changePage(false)"
      href="javascript:;"
    >
      <b-icon name="arrow-left-bold" :size="14" color="#9CA6B9"></b-icon>
    </a>

    <!-- ... -->
    <!-- <a class="b-page-size b-outside-border" v-if="pager.start > 1" href="javascript:;">...</a> -->

    <!-- 页数按钮 -->
    <a
      class="b-page-size b-outside-border"
      v-for="i in pager.btnArr"
      :key="i"
      href="javascript:;"
      :class="{ active: i === currentPageNum }"
      @click="changePage(i)"
      >{{ i }}</a
    >

    <!-- ... -->
    <!-- <a class="b-page-size b-outside-border" v-if="pager.end < pages" href="javascript:;">...</a> -->

    <!-- 下一页 -->
    <a
      class="b-right-arrow b-outside-border"
      :class="{ disabled: currentPageNum >= pages }"
      href="javascript:;"
      @click="changePage(true)"
    >
      <b-icon name="arrow-right-bold" :size="14" color="#9CA6B9"></b-icon>
    </a>

    <!-- 选择一页条数 -->
    <div
      class="b-page-num b-num-out-size-border"
      @click.stop="openPageNum = !openPageNum"
    >
      <div class="b-text-page-num">
        <span>{{ pageSize }}</span>
        <span>条/页</span>
      </div>
      <b-icon
        class="b-page-num-icon"
        :name="upDown"
        :size="14"
        color="#9CA6B9"
      ></b-icon>
      <!-- <img
        class="b-page-num-icon"
        :src="
          openPageNum
            ? '../../../../public/编组 29.png'
            : '../../../../public/编组 28.png'
        "
        alt=""
      /> -->
      <transition name="zoom-in-top">
        <div class="b-select-dropdown b-popper" v-show="openPageNum">
          <div
            class="b-select-dropdown-item"
            v-for="item in pageNum"
            :key="item"
            @click="changePages(item)"
          >
            <span>{{ item }}</span>
            <span>条/页</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import BIcon from '@/components/icon/src/icon.vue'
import { addEvent, removeEvent } from '@/utils'
import {
  toRefs,
  ref,
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'
import type { PropType } from 'vue'
// 导入接口
export default defineComponent({
  name: 'BPagination',
  props: {
    // 总条数
    total: {
      type: Number as PropType<number>,
      default: 100
    },
    // // 当前页
    currentPage: {
      type: Number as PropType<number>,
      default: 1
    },
    // 一页的数量
    pageSize: {
      type: Number as PropType<number>,
      default: 10
    }
  },
  emits: ['change-page', 'page-size-change'],
  setup(props, { emit }) {
    const { total, pageSize } = toRefs(props)
    // 下拉页数
    const openPageNum = ref(false)
    // 每页条数的选择
    const pageNum = [10, 20, 30]
    // 按钮的个数
    const btnCount = 10
    const hiddenDropdown = () => (openPageNum.value = false)
    onMounted(() => addEvent(document, 'click', hiddenDropdown))
    onBeforeUnmount(() => removeEvent(document, 'click', hiddenDropdown))
    // 总页数
    const pages = computed(() => Math.ceil(total.value / pageSize.value))
    // 箭头样式
    const upDown = computed(() =>
      openPageNum.value ? 'arrow-up-bold' : 'arrow-down-bold'
    )
    // 当前页码
    const currentPageNum = ref(props.currentPage || 1)

    // 动态计算页码列表
    const list = computed(() => {
      // 当父组件传递total的值发生变化时，计算属性会重新计算
      // pages = Math.ceil(props.total / props.pagesize)
      const result = []
      // 总页码小于等于5；大于5
      if (pages.value <= 5) {
        // 总页码小于等于5的情况
        for (let i = 1; i <= pages.value; i++) {
          result.push(i)
        }
      } else {
        // 总页码大于5
        if (currentPageNum.value <= 2) {
          // 左侧临界值
          for (let i = 1; i <= 5; i++) {
            result.push(i)
          }
        } else if (currentPageNum.value >= currentPageNum.value - 1) {
          // 右侧临界值
          for (let i = pages.value - 4; i <= pages.value; i++) {
            result.push(i)
          }
        } else {
          // 中间的状态
          for (
            let i = currentPageNum.value - 2;
            i <= currentPageNum.value + 2;
            i++
          ) {
            result.push(i)
          }
        }
      }
      return result
    })

    // * 根据上述数据得到（总页数，起始页码，结束页码，按钮数组）
    const pager = computed(() => {
      // 计算起始页码 和 结束页码
      let start = currentPageNum.value - Math.floor(btnCount / 2)
      let end = start + btnCount - 1
      // 2.1 - 如果起始页码小于1，需要重新计算
      if (start < 1) {
        start = 1
        end =
          start + btnCount - 1 > pages.value
            ? pages.value
            : start + btnCount - 1
      }
      // 2.2 - 如果结束页码大于总页数，需要重新计算
      if (end > pages.value) {
        end = pages.value
        start = end - btnCount + 1 < 1 ? 1 : end - btnCount + 1
      }
      // 处理完毕 start 和 end 得到按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      return {
        start,
        end,
        btnArr
      }
    })

    // 控制上一页和下一页变化
    const changePage = (type: number | boolean) => {
      if (type === false) {
        // 上一页
        // 页面是第一页时，禁止点击操作
        if (currentPageNum.value === 1) return
        if (currentPageNum.value > 1) {
          currentPageNum.value -= 1
        }
      } else if (type === true) {
        // 下一页
        // 页面是最后页时，禁止点击操作
        if (currentPageNum.value === pages.value) return
        if (currentPageNum.value < pages.value) {
          currentPageNum.value += 1
        }
      } else {
        // 点击页码
        currentPageNum.value = type
      }
      emit('change-page', currentPageNum.value)
    }

    // 选择每页显示的条数
    function changePages(num: number) {
      if (pageSize.value === num) return
      currentPageNum.value = 1
      emit('page-size-change', num)
    }
    return {
      list,
      currentPageNum,
      pageNum,
      pages,
      openPageNum,
      pager,
      upDown,
      changePage,
      changePages
    }
  },
  components: {
    BIcon
  }
})
</script>

<style scoped lang="less">
@import "../style/pagination";
</style>
