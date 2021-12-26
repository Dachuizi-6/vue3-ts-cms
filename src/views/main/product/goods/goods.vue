<template>
  <div class="goods">
    <!-- handleResetCall这里监听是为了点击按钮之后再去请求列表数据 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleResetCall="handleResetReal"
      @handelSearchCall="handelSearchReal"
    ></page-search>
    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="goods"
      ref="pageContentRef"
    >
      <template #imgUrl="scoped">
        <el-image
          style="width: 100px; height: 100px"
          :src="scoped.row.imgUrl"
          :preview-src-list="[scoped.row.imgUrl]"
          :initial-index="1"
        >
        </el-image>
      </template>
      <template #status="scoped">
        <el-button
          size="mini"
          plain
          :type="scoped.row.status ? 'primary' : 'info'"
        >
          {{ scoped.row.status ? '下架' : '上架' }}
        </el-button>
      </template>
    </page-content>
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
  name: 'goods',
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
