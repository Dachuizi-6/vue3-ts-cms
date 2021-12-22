<template>
  <div class="page-content">
    <zw-table
      :listData="dataList"
      v-bind="tableContentConfig"
      @selectionChange="realHandelSelectChange"
    >
      <!-- header中的插槽 -->
      <template #handelHandel>
        <el-button size="medium" type="primary">新建用户</el-button>
      </template>

      <!-- 列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #handel>
        <!-- 按钮权限有没有在这里控制：v-if -->
        <el-button :icon="Edit" size="mini" type="text">编辑</el-button>
        <el-button :icon="Delete" size="mini" type="text">删除</el-button>
      </template>
    </zw-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

import { useStore } from '@/store'

import ZwTable from '@/base-ui/table'

export default defineComponent({
  components: {
    ZwTable
  },
  props: {
    tableContentConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    store.dispatch('system/getPageListAction', {
      // url: '/users/list',
      pageName: props.pageName,
      queryInfo: { offset: 0, size: 10 }
    })

    // const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.userCount)

    const dataList = computed(() =>
      store.getters['system/getPageListData'](props.pageName)
    )

    const realHandelSelectChange = (selecteds: any) => {
      console.log(selecteds) // 拿到所有的选中项
    }

    return {
      Edit,
      Delete,
      realHandelSelectChange,
      dataList
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
