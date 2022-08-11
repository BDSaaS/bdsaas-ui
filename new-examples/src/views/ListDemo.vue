<template>
  <div class="table-box">
    <b-list
      :data="listData"
      :columns="columns"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      @select-all-change="selectAllChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column === 'gender'">
          {{ record.gender }}
          <i
            v-if="record.gender === '男'"
            class="icon-nan iconfont"
            style="color: deepskyblue;"
          ></i>
          <i v-else class="icon-nv iconfont" style="color: deeppink;"></i>
        </template>
      </template>
      <template #footer>
        <div class="list-footer">
          <b-button type="primary" icon="icon-jiazai_shuaxin"
            >刷新表格
          </b-button>
        </div>
      </template>
    </b-list>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'ListDemo',
  setup() {
    const state = reactive({
      listData: [
        { name: '张三', age: 20, gender: '男', key: '1' },
        { name: '小红', age: 20, gender: '女', key: '2' },
        { name: '张三', age: 20, gender: '男', key: '3' }
      ],
      columns: [
        { title: '姓名', dataIndex: 'name' },
        { title: '年龄', dataIndex: 'age' },
        { title: '性别', dataIndex: 'gender' }
      ],
      selectedRowKeys: ['1']
    })

    function onSelectChange(
      selectedRowKeys: string[],
      selectedRows: typeof state.listData
    ) {
      console.log(selectedRowKeys, selectedRows)
    }

    return {
      ...toRefs(state),
      onSelectChange,
      selectAllChange: (val: boolean) => {
        console.log('全选状态是：', val)
      }
    }
  }
})
</script>

<style scoped>
.table-box {
  width: 1000px;
  padding: 50px;
  margin: 0 auto;
  background: #f8f7f7;
}

.list-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 80px;
  padding-right: 20px;
}
</style>
