<template>
  <div class="search-page">
    <zw-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="handel-header">高级检索</h2>
      </template>
      <template #footer>
        <div class="handel-footer">
          <el-button :icon="Refresh" @click="handelReset">重置</el-button>
          <el-button :icon="Search" type="primary" @click="handelSearch">
            搜索
          </el-button>
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
  emits: ['handleResetCall', 'handelSearchCall'],
  setup(props, { emit }) {
    // 1、表单绑定属性由用户决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOrigin: any = {}
    for (const item of formItems) {
      formOrigin[item.field] = ''
    }

    // 绑定表单组件数据
    // const formData = ref({
    //   id: '',
    //   name: '',
    //   password: '',
    //   sport: '',
    //   dateRange: ''
    // })
    const formData = ref(formOrigin)

    // 2、点击按钮重置
    const handelReset = () => {
      // 第一种实现
      // for (const key in formOrigin) {
      //   formData.value[key] = formOrigin[key]
      // }

      // 第二种实现
      formData.value = formOrigin

      // 告知父组件去重新请求数据
      emit('handleResetCall')
    }

    // 3、点击搜索按钮
    const handelSearch = () => {
      emit('handelSearchCall', formData.value)
    }

    return {
      formData,
      Refresh,
      Search,
      handelReset,
      handelSearch
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
