<template>
  <div class="user">
    <search-page :searchFormConfig="searchFormConfig"></search-page>

    <div class="content">
      <zw-table
        :title="title"
        :listData="userList"
        :propData="propList"
        :isShowColumnIndex="isShowColumnIndex"
        :isShowSelection="isShowSelection"
        @selectionChange="realHandelSelectChange"
      >
        <!-- header中的插槽 -->
        <template #handelHandel>
          <el-button size="mediue" type="primary">新建用户</el-button>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { searchFormConfig } from './config/search.config'

import { useStore } from '@/store'

import SearchPage from '@/components/search-page'
import ZwTable from '@/base-ui/table'

export default defineComponent({
  components: {
    SearchPage,
    ZwTable
  },
  name: 'user',
  setup() {
    const store = useStore()

    store.dispatch('system/getPageListAction', {
      url: '/users/list',
      queryInfo: { offset: 0, size: 10 }
    })

    const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.userCount)

    const title = '用户列表'

    const propList = [
      {
        prop: 'name',
        label: '用户名',
        minWidth: '100'
      },
      {
        prop: 'realname',
        label: '真实姓名',
        minWidth: '100'
      },
      {
        prop: 'enable',
        label: '状态',
        minWidth: '100',
        slotName: 'status'
      },
      {
        prop: 'cellphone',
        label: '电话号码',
        minWidth: '100'
      },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '120',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '最后操作时间',
        minWidth: '120',
        slotName: 'updateAt'
      },
      {
        label: '操作',
        minWidth: '120',
        slotName: 'handel'
      }
    ]

    const isShowColumnIndex = true
    const isShowSelection = true

    const realHandelSelectChange = (selecteds: any) => {
      console.log(selecteds) // 拿到所有的选中项
    }

    return {
      Edit,
      Delete,
      searchFormConfig,
      userList,
      propList,
      isShowColumnIndex,
      isShowSelection,
      realHandelSelectChange,
      title
    }
  }
})
</script>

<style scoped lang="less">
.user {
  .content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
  }
}
</style>
