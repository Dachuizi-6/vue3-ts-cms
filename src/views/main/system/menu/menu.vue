<template>
  <div class="menu">
    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import { tableContentConfig } from './comfig/table.config'

export default defineComponent({
  components: {
    PageContent
  },
  name: 'zw-menu',
  setup() {
    return {
      tableContentConfig
    }
  }
})
</script>

<style scoped></style>
