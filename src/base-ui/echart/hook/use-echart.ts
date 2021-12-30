import * as echarts from 'echarts'

import chinaData from '../china-data/china.json'
echarts.registerMap('china', chinaData)

export function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  const updateSize = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
