<template>
  <div class="base-echart">
    <div
      class="echart-content"
      ref="echartRef"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, withDefaults, defineProps, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import { useEchart } from '../hook/use-echart'

const props = withDefaults(
  defineProps<{ options: EChartsOption; width?: string; height?: string }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartRef.value!)

  watchEffect(() => {
    setOptions(props.options)
  })
  // var myChart = echarts.init(echartRef.value!)
  // myChart.setOption(props.options)
})
</script>

<style scoped></style>
