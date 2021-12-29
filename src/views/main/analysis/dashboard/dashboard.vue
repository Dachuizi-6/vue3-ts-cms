<template>
  <div class="dashboard">
    <el-row :gutter="10">
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
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <zw-card title="分类商品销量">
          <line-echart v-bind="lineData"></line-echart>
        </zw-card>
      </el-col>
      <el-col :span="12">
        <zw-card title="分类商品收藏">
          <bar-echart v-bind="barData"></bar-echart>
        </zw-card>
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
import { LineEchart } from '@/components/page-echarts'
import { BarEchart } from '@/components/page-echarts'

export default defineComponent({
  components: {
    ZwCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart
  },
  name: 'dashboard',
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataAction')

    // 获取数据
    // 饼图
    const pieData = computed(() => {
      return store.state.dashboard.goodsCategoryCount.map((item: any) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })
    // 折线图
    const lineData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const goodsCategorySale = store.state.dashboard.goodsCategorySale
      for (const item of goodsCategorySale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      console.log(xLabels, values)
      return {
        xLabels,
        values
      }
    })
    // 可伸缩柱状图
    const barData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const goodsCategoryFavor = store.state.dashboard.goodsCategoryFavor
      for (const item of goodsCategoryFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }

      return {
        xLabels,
        values
      }
    })

    return {
      pieData,
      lineData,
      barData
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
