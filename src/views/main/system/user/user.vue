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
    ></page-content>

    <page-modal
      :modalFormConfig="modalFormConfig"
      ref="pageModelRef"
      :editInfo="editInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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

    return {
      searchFormConfig,
      tableContentConfig,
      pageContentRef,
      handleResetReal,
      handelSearchReal,
      modalFormConfig,
      pageModelRef,
      handelAddReal,
      handelEditReal,
      editInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
