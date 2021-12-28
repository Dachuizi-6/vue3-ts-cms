<template>
  <div class="dashboard">
    <el-row gutter="10">
      <el-col :span="8">
        <zw-card title="aaa"></zw-card>
      </el-col>
      <el-col :span="8">
        <zw-card title="aaa"></zw-card>
      </el-col>
      <el-col :span="8">
        <zw-card title="aaa"></zw-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

import ZwCard from '@/base-ui/card'

export default defineComponent({
  components: {
    ZwCard
  },
  name: 'dashboard',
  setup() {
    const store = useStore()

    store.dispatch('dashboard/getDashboardDataAction')
    return {}
  }
})
</script>

<style scoped></style>
