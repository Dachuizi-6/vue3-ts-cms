<template>
  <div class="user">
    <search-page
      :searchFormConfig="searchFormConfig"
      @handleResetCall="handleResetReal"
      @handelSearchCall="handelSearchReal"
    ></search-page>

    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="users"
      ref="pageContentRef"
    ></page-content>

    <page-modal :modalFormConfig="modalFormConfig"></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SearchPage from '@/components/search-page'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { tableContentConfig } from './config/table.config'
import { modalFormConfig } from './config/modal.config'

import { useSearchHook } from '@/hooks/use-search'

export default defineComponent({
  components: {
    SearchPage,
    PageContent,
    PageModal
  },
  name: 'user',
  setup() {
    const [pageContentRef, handleResetReal, handelSearchReal] = useSearchHook()

    return {
      searchFormConfig,
      tableContentConfig,
      pageContentRef,
      handleResetReal,
      handelSearchReal,
      modalFormConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
