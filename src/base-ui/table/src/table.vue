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
    <div class="footer">
      <slot name="footer">
        <!-- <el-pagination
          v-model:currentPage="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination> -->
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
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
  emits: ['selectionChange'],
  setup(prop, { emit }) {
    const handelSelection = (select: any) => {
      emit('selectionChange', select)
    }
    return { handelSelection }
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
