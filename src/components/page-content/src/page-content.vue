<template>
  <div class="page-content">
    <zw-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="tableContentConfig"
      @selectionChange="realHandelSelectChange"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #handelHandel>
        <el-button
          v-if="isCreate"
          size="medium"
          type="primary"
          @click="handelAdd"
        >
          新建用户
        </el-button>
      </template>

      <!-- 列中固定的插槽 -->
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #handel="scope">
        <!-- 按钮权限有没有在这里控制：v-if -->
        <el-button
          v-if="isUpdate"
          :icon="Edit"
          size="mini"
          type="text"
          @click="handelEdit(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="isDelete"
          :icon="Delete"
          size="mini"
          type="text"
          @click="handelDelete(scope.row)"
          >删除</el-button
        >
      </template>

      <!-- 动态插槽 -->
      <template
        v-for="dSlot in dongtaiSlot"
        :key="dSlot.prop"
        #[dSlot.slotName]="scoped"
      >
        <template v-if="dSlot.slotName">
          <slot :name="dSlot.slotName" :row="scoped.row"></slot>
        </template>
      </template>
    </zw-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

import { useStore } from '@/store'

import ZwTable from '@/base-ui/table'

import { usePermissions } from '@/hooks/use-permissions'

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
  emits: ['handelAddCall', 'handelEditCall'],
  setup(props, { emit }) {
    const store = useStore()

    // 6、按钮权限处理
    const isCreate = usePermissions(props.pageName, 'create')
    const isDelete = usePermissions(props.pageName, 'delete')
    const isUpdate = usePermissions(props.pageName, 'update')
    const isQuery = usePermissions(props.pageName, 'query')

    // 4、处理分页
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => getPageData())

    // 1、触发action发送异步请求
    const getPageData = (searchData: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        // url: '/users/list',
        pageName: props.pageName,
        queryInfo: {
          ...searchData,
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize
        }
      })
    }
    getPageData()

    ///2、获取store里面的数据
    const dataList = computed(() =>
      store.getters['system/getPageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/getPageCountData'](props.pageName)
    )

    // const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.userCount)

    // 3、处理选中
    const realHandelSelectChange = (selecteds: any) => {
      console.log(selecteds) // 拿到所有的选中项
    }

    // 4、动态插槽
    const dongtaiSlot = props.tableContentConfig.propData.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handel') return false
        return true
      }
    )

    // 7、点击删除
    const handelDelete = (row: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: row.id
      })
    }

    // 8、点击新建、编辑
    const handelAdd = () => {
      emit('handelAddCall')
    }
    const handelEdit = (row: any) => {
      emit('handelEditCall', row)
    }

    return {
      Edit,
      Delete,
      realHandelSelectChange,
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      dongtaiSlot,
      isCreate,
      isDelete,
      isUpdate,
      handelDelete,
      handelAdd,
      handelEdit
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
