<template>
  <div class="search-page">
    <zw-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="handel-header">高级检索</h2>
      </template>
      <template #footer>
        <div class="handel-footer">
          <el-button :icon="Refresh">重置</el-button>
          <el-button :icon="Search" type="primary">搜索</el-button>
        </div>
      </template>
    </zw-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'

import ZwForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    ZwForm
  },
  setup() {
    // 绑定表单组件数据
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      dateRange: ''
    })
    return {
      formData,
      Refresh,
      Search
    }
  }
})
</script>

<style scoped lang="less">
.search-page {
  .handel-header {
    color: #409eff;
  }
  .handel-footer {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
