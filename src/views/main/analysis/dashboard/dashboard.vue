<template>
  <div class="dashboard">
    <el-row gutter="10">
      <el-col :span="7">
        <zw-card title="分类商品数量（饼图）">
          <pie-echart :pieData="pieData"></pie-echart>
        </zw-card>
      </el-col>
      <el-col :span="10">
        <zw-card title="不同城市商品销量"></zw-card>
      </el-col>
      <el-col :span="7">
        <zw-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="pieData"></rose-echart>
        </zw-card>
      </el-col>
    </el-row>
    <el-row gutter="10" class="content-row">
      <el-col :span="12">
        <zw-card title="分类商品销量"> </zw-card>
      </el-col>
      <el-col :span="12">
        <zw-card title="分类商品收藏"></zw-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import ZwCard from '@/base-ui/card'
import { PieEchart } from '@/components/page-echarts'
import { RoseEchart } from '@/components/page-echarts'

export default defineComponent({
  components: {
    ZwCard,
    PieEchart,
    RoseEchart
  },
  name: 'dashboard',
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const pieData = computed(() => {
      return store.state.dashboard.goodsCategoryCount.map((item: any) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })

    return {
      pieData
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
