<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleResetCall="handleResetReal"
      @handelSearchCall="handelSearchReal"
    ></page-search>
    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="role"
      ref="pageContentRef"
      @handelAddCall="handelAddReal"
      @handelEditCall="handelEditReal"
    ></page-content>
    <page-modal
      ref="pageModelRef"
      :modalFormConfig="modalFormConfig"
      pageName="role"
      :editInfo="editInfo"
      :otherInfo="otherInfo"
    >
      <div class="el-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          node-key="id"
          @check="handelCheck"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { mapRoleToTree } from '@/utils/map-menus-to-routes'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { tableContentConfig } from './config/table.config'
import { searchFormConfig } from './config/search.config'
import { modalFormConfig } from './config/modal.config'

import { useSearchHook } from '@/hooks/use-search'
import { useModalHook } from '@/hooks/use-modal'

import { ElTree } from 'element-plus'
export default defineComponent({
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  name: 'role',
  setup() {
    const [pageContentRef, handleResetReal, handelSearchReal] = useSearchHook()

    // eltree数据回显
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (rowItem: any) => {
      const selectedKeys = mapRoleToTree(rowItem.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(selectedKeys, false)
      })
    }

    const [pageModelRef, editInfo, handelAddReal, handelEditReal] =
      useModalHook(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.allMenuList)

    // 传递选中数据给表单提交
    const otherInfo = ref({})
    const handelCheck = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      otherInfo.value = { menuList: [...checkedKeys, ...halfCheckedKeys] }
    }

    return {
      tableContentConfig,
      searchFormConfig,
      pageContentRef,
      handleResetReal,
      handelSearchReal,
      modalFormConfig,
      pageModelRef,
      editInfo,
      handelAddReal,
      handelEditReal,
      menus,
      handelCheck,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.el-tree {
  margin-left: 38px;
}
</style>
