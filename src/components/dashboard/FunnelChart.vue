<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useEChartsTheme } from '@/composables/useEChartsTheme'

const props = defineProps<{ stages: { name: string; value: number }[] }>()

const chartRef = ref<HTMLDivElement | null>(null)
const { theme } = useEChartsTheme()

let chart: echarts.ECharts | null = null

function render() {
  if (!chartRef.value) return

  if (chart) chart.dispose()

  chart = echarts.init(chartRef.value)
  chart.setOption({
    backgroundColor: theme.value.backgroundColor,
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    series: [{
      type: 'funnel',
      left: '10%',
      top: 20,
      bottom: 20,
      width: '80%',
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: { color: theme.value.textColor },
      labelLine: { lineStyle: { color: theme.value.axisLine } },
      itemStyle: { borderColor: theme.value.axisLine, borderWidth: 1 },
      data: props.stages.map(s => ({ value: s.value, name: s.name }))
    }]
  })
}

onMounted(() => {
  nextTick(render)
  window.addEventListener('resize', render)
})

watch(theme, render)

onBeforeUnmount(() => {
  window.removeEventListener('resize', render)
  chart?.dispose()
})
</script>

<template>
  <div ref="chartRef" class="h-72 w-full" />
</template>
