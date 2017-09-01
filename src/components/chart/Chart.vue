<template>
  <div>
    <div v-if="data.data && data.data.length > 0" :id="id" :style="{height: height + 'px'}" class="chart"></div>
    <div v-else style="text-align: center;height: 50px;line-height: 50px">图表[{{data.title}}]-暂无数据</div>
  </div>
</template>

<script>
  import {getOption} from './chart.js'
  import echarts from 'echarts'
  export default {
    props: {
        id: {
          type: String,
          default: 'chart' + new Date().getTime()
        },
        height: {
            type: Number,
            default: 400
        },
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
      initChart () {
        if (!this.data.data || this.data.data.length === 0) return
        let dom = document.getElementById(this.id)
        let chart = echarts.getInstanceByDom(dom)
        if (!chart) {
          chart = echarts.init(dom)
        }
        window.addEventListener('resize', function () {
          chart.resize()
        })
        chart.showLoading()
        let _option = {}
        if (this.data) {
          _option = getOption(this.data)
        }
        chart.hideLoading()

        chart.setOption(_option)
      }
    },
    watch: {
      data: function (val, oldVal) {
        this.$nextTick(function () {
          this.initChart()
        })
      }
    },
    mounted () {
       this.$nextTick(function () {
          this.initChart()
       })
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%;
  }
</style>
