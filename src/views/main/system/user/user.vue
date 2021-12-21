<template>
  <div class="user">
    <search-page :searchFormConfig="searchFormConfig"></search-page>

    <div class="content">
      <zw-table :listData="userList" :propData="propList">
        <template #status="scope">
          <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
        <template #updateAt="scope">
          {{ scope.row.createAt }}
        </template>
      </zw-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

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
      }
    ]

    return {
      searchFormConfig,
      userList,
      propList
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
