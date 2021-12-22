<template>
  <div class="user">
    <search-page :searchFormConfig="searchFormConfig"></search-page>

    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SearchPage from '@/components/search-page'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { tableContentConfig } from './config/table.config'

export default defineComponent({
  components: {
    SearchPage,
    PageContent
  },
  name: 'user',
  setup() {
    return {
      searchFormConfig,
      tableContentConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
