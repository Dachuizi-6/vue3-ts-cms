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
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'

import { tableContentConfig } from './config/table.config'
import { searchFormConfig } from './config/search.config'

import { useSearchHook } from '@/hooks/use-search'

export default defineComponent({
  components: {
    PageContent,
    PageSearch
  },
  name: 'role',
  setup() {
    const [pageContentRef, handleResetReal, handelSearchReal] = useSearchHook()

    return {
      tableContentConfig,
      searchFormConfig,
      pageContentRef,
      handleResetReal,
      handelSearchReal
    }
  }
})
</script>

<style scoped></style>
