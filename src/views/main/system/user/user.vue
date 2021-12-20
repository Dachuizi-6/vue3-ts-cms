<template>
  <div class="user">
    <search-page :searchFormConfig="searchFormConfig"></search-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SearchPage from '@/components/search-page'
import { searchFormConfig } from './config/search.config'

import { useStore } from '@/store'

export default defineComponent({
  components: {
    SearchPage
  },
  name: 'user',
  setup() {
    const store = useStore()

    store.dispatch('system/getPageListAction', {
      url: '/users/list',
      queryInfo: { offset: 0, size: 10 }
    })
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
