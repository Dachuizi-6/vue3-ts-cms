<template>
  <div class="map-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IEchartsData } from '../types'
import { convertData } from '../utils/convert-data'

const props = defineProps<{ mapData: IEchartsData[] }>()

const options = computed(() => {
  return {
    backgroundColor: '#fff',
    title: {
      text: '全国销量统计',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      }
    },
    // legend: {
    //   orient: 'vertical',
    //   right: 20,
    //   top: 10,
    //   data: ['销售量'],
    //   textStyle: {
    //     color: '#fff'
    //   }
    // },
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: 'skyblue'
      }
    },
    geo: {
      map: 'china',
      roam: 'scale',
      emphasis: {
        // label: {
        //   show: true
        // },
        // normal: {
        areaColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(9, 54, 95)',
        // },
        itemStyle: {
          areaColor: 'pink'
        }
      }
    },
    series: [
      {
        name: '销售量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 12,
        emphasis: {
          // show: false,
          // label: {
          //   show: false
          // },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
    // dataset: {source: mapdata}
  }
})
</script>

<style scoped></style>
