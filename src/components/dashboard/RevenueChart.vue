<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useEChartsTheme } from '@/composables/useEChartsTheme'

const props = defineProps<{ series: number[] }>()

const chartRef = ref<HTMLDivElement | null>(null)
const { theme } = useEChartsTheme()
let chart: echarts.ECharts | null = null

function render() {
  if (!chartRef.value) return
  if (chart) chart.dispose()

  chart = echarts.init(chartRef.value, undefined, { renderer: 'canvas' })
  chart.setOption({
    backgroundColor: theme.value.backgroundColor || '#fff',
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Jan','Feb','Mar','Apr','May','Jun'] },
    yAxis: { type: 'value' },
    series: [{ data: props.series, type: 'line', smooth: true }]
  })
}

onMounted(() => {
  nextTick(render)
  window.addEventListener('resize', render)
})
watch(theme, render)
onBeforeUnmount(() => { window.removeEventListener('resize', render); chart?.dispose() })

</script>

<template>
  <div ref="chartRef" class="h-72 w-full" />
</template>
