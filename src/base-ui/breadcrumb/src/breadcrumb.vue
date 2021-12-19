<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadCrumb } from '../types'

export default defineComponent({
  props: {
    breadcrumb: Array as PropType<IBreadCrumb[]>,
    default: () => []
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
