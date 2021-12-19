<template>
  <div class="user">
    <zw-form v-bind="searchFormConfig" v-model="formData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ZwForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: {
    ZwForm
  },
  name: 'user',
  setup() {
    // 绑定表单组件数据
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      dateRange: ''
    })

    console.log(formData)
    return {
      searchFormConfig,
      formData
    }
  }
})
</script>

<style scoped></style>
