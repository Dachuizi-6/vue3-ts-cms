<template>
  <div class="zw-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handel">
          <slot name="handelHandel"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handelSelection"
      v-bind="expandRow"
    >
      <el-table-column
        type="selection"
        v-if="isShowSelection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="isShowColumnIndex"
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propData" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scoped">
            <!-- <el-button type="info">{{ scoped.row }}</el-button> -->
            <!-- scoped.row是一个对象 -->
            <slot :name="propItem.slotName" :row="scoped.row">{{
              scoped.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="isShowFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          :total="listCount"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    page: {
      type: Object,
      default: () => ({ pageSize: 10, currentPage: 1 })
    },
    expandRow: {
      type: Object,
      default: () => ({})
    },
    isShowFooter: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propData: {
      type: Array,
      required: true
    },
    isShowColumnIndex: {
      type: Boolean,
      default: false
    },
    isShowSelection: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // 1、处理选中
    const handelSelection = (select: any) => {
      emit('selectionChange', select)
    }

    // 处理分页
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    return {
      handelSelection,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.zw-table {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px 10px;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .handel {
      align-items: center;
    }
  }

  .footer {
    margin-top: 15px;
    .el-pagination {
      text-align: right;
    }
  }
}
</style>
