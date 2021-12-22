<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/search-page'

import { tableContentConfig } from './config/table.config'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: {
    PageContent,
    PageSearch
  },
  name: 'role',
  setup() {
    return {
      tableContentConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
