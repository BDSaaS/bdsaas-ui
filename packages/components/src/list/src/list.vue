<template>
  <div class="b-list">
    <div class="b-list-head">
      <table class="table-head">
        <colgroup>
          <col v-if="rowSelection" style="width: 60px;">
          <col
              v-for="(col, index) of columns"
              :key="index"
              :style="{ width: col.width }"
          >
        </colgroup>
        <thead>
        <tr>
          <th v-if="rowSelection">
            <b-checkbox
                v-model="selectedAll"
                @change="selectAllChange"
            ></b-checkbox>
          </th>
          <th v-for="(col, index) of columns" :key="index">
            {{ col.title }}
          </th>
        </tr>
        </thead>
      </table>
    </div>
    <table class="table-body">
      <colgroup>
        <col v-if="rowSelection" style="width: 60px;">
        <col
            v-for="(col, index) of columns"
            :key="index"
            :style="{ width: col.width }"
        >
      </colgroup>
      <tbody>
      <tr
          v-for="row of data"
          :key="row.key"
          @mouseenter="enterHandler"
          @mouseleave="leaveHandler"
          @click="clickTr(row)"
      >
        <td v-if="rowSelection">
          <b-checkbox v-model="row.selected"></b-checkbox>
        </td>
        <td v-for="(col, index) of columns" :key="index">
          <slot name="bodyCell" :column="col.dataIndex" :record="row">
            {{ row[col.dataIndex] }}
          </slot>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="list-footer">
      <slot name="footer"></slot>
    </div>
  </div>

  <!--  <teleport to="body">-->
  <!--    <transition name="slide-fade">-->
  <!--      <div v-if="showFocusMask" class="tr-focus-mask">-->
  <!--        <div class="info-box"></div>-->
  <!--      </div>-->
  <!--    </transition>-->
  <!--  </teleport>-->
</template>

<script lang="ts">
import "../style/index.less"
import {defineComponent, toRefs, onBeforeUnmount, toRaw} from 'vue'
import {useListSelected} from './hooks/useListSelected'
import {showFocusMask, enterHandler, leaveHandler} from './hooks/useTableRowFocus'
import type {TableData, Columns, RowSelection} from '../types'
import type {PropType} from 'vue'
import BCheckbox from '../../checkbox/src/checkbox.vue'
import {Data} from "../types";

export default defineComponent({
  name: 'BList',
  components: {BCheckbox},
  props: {
    data: {
      type: Array as PropType<TableData>,
      required: true
    },
    columns: {
      type: Array as PropType<Columns>,
      required: true
    },
    rowSelection: {
      type: Object as PropType<RowSelection | null>,
      default: null
    }
  },
  emits: ['selectAllChange', 'row-click'],
  setup(props, {emit}) {
    const {data, rowSelection} = toRefs(props)
    const {selectedAll, selectAllChange} = useListSelected(
        data.value,
        rowSelection.value as RowSelection,
        emit
    )

    onBeforeUnmount(() => {
      showFocusMask.value = false
    })

    function clickTr(val: Data) {
      emit('row-click', toRaw(val))
    }

    return {
      selectedAll,
      selectAllChange,
      showFocusMask,
      enterHandler,
      clickTr,
      leaveHandler
    }
  }
})
</script>
