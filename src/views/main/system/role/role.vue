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
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { tableContentConfig } from './config/table.config'
import { searchFormConfig } from './config/search.config'
import { modalFormConfig } from './config/modal.config'

import { useSearchHook } from '@/hooks/use-search'
import { useModalHook } from '@/hooks/use-modal'

export default defineComponent({
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  name: 'role',
  setup() {
    const [pageContentRef, handleResetReal, handelSearchReal] = useSearchHook()

    const [pageModelRef, editInfo, handelAddReal, handelEditReal] =
      useModalHook()

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
      handelEditReal
    }
  }
})
</script>

<style scoped></style>
