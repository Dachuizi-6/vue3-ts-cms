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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SearchPage from '@/components/search-page'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { tableContentConfig } from './config/table.config'

import { useSearchHook } from '@/hooks/use-search'

export default defineComponent({
  components: {
    SearchPage,
    PageContent
  },
  name: 'user',
  setup() {
    const [pageContentRef, handleResetReal, handelSearchReal] = useSearchHook()

    return {
      searchFormConfig,
      tableContentConfig,
      pageContentRef,
      handleResetReal,
      handelSearchReal
    }
  }
})
</script>

<style scoped lang="less"></style>
