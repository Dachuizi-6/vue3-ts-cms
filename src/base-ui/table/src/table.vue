<template>
  <div class="zw-table">
    <el-table :data="listData" border style="width: 100%">
      <template v-for="propItem in propData" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scoped">
            <!-- <el-button type="info">{{ scoped.row }}</el-button> -->
            <!-- scoped.row是一个对象 -->
            <slot :name="propItem.slotName" :row="scoped.row">{{
              scoped.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propData: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
