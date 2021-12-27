<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleResetCall="handleResetReal"
      @handelSearchCall="handelSearchReal"
    ></page-search>

    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="users"
      ref="pageContentRef"
      @handelAddCall="handelAddReal"
      @handelEditCall="handelEditReal"
    >
      <template #enable="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>

    <page-modal
      :modalFormConfig="modalFormConfigRef"
      ref="pageModelRef"
      :editInfo="editInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { tableContentConfig } from './config/table.config'
import { modalFormConfig } from './config/modal.config'

import { useSearchHook } from '@/hooks/use-search'
import { useModalHook } from '@/hooks/use-modal'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  name: 'user',
  setup() {
    const [pageContentRef, handleResetReal, handelSearchReal] = useSearchHook()

    // 1、控制密码框的显示与隐藏
    const addCallbcak = () => {
      const hiddenItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      hiddenItem!.isHidden = false
    }
    const editCallback = () => {
      const hiddenItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      hiddenItem!.isHidden = true
    }
    const [pageModelRef, editInfo, handelAddReal, handelEditReal] =
      useModalHook(addCallbcak, editCallback)

    // 2、动态展示部门和角色数据
    const store = useStore()
    const modalFormConfigRef = computed(() => {
      const departmentList = store.state.allDepList
      const roleList = store.state.allRoleList
      const departmentIdItem = modalFormConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      const roleIdItem = modalFormConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      departmentIdItem!.options = departmentList.map((dep) => ({
        title: dep.name,
        value: dep.id
      }))
      roleIdItem!.options = roleList.map((role) => ({
        title: role.name,
        value: role.id
      }))
      return modalFormConfig
    })

    return {
      searchFormConfig,
      tableContentConfig,
      pageContentRef,
      handleResetReal,
      handelSearchReal,
      modalFormConfigRef,
      pageModelRef,
      handelAddReal,
      handelEditReal,
      editInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
