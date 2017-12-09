<template>
  <div v-if="data && data.data && data.data.length > 0" :id="id" :style="{height: height + 'px'}" class="chart"></div>
  <div v-else style="text-align: center;height: 50px;line-height: 50px" :id="id">图表[{{data.title}}]-暂无数据</div>
</template>

<script>
  import {getOption} from './chart'
  import echarts from 'echarts'
  export default {
    data () {
      return {
        chart: null,
        parentWidth: 0
      }
    },
    props: {
      id: {
        type: String,
        default: 'chart' + new Date().getTime()
      },
      height: {
        type: [Number, String],
        default: 400
      },
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      initChart () {
        if (!this.data.data || this.data.data.length === 0) {
          if (this.chart) {
            this.chart.dispose()
          }
          return
        }
        let dom = document.getElementById(this.id)
        if (!dom) {
          return
        }
        this.chart = echarts.getInstanceByDom(dom)
        if (!this.chart) {
          this.chart = echarts.init(dom)
        }
        this.chart.clear()
//        window.addEventListener('resize', function () {
//          chart.resize()
//        })
        this.chart.showLoading()
        let _option = {}
        if (this.data) {
          _option = getOption(this.data)
        }
        this.chart.hideLoading()
        this.chart.setOption(_option)
        this.chart.resize()
      }
    },
    watch: {
      data (val, oldVal) {
        this.initChart()
      },
      parentWidth () { // 自适应父div宽度
        if (this.chart) {
          this.chart.resize()
        }
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.initChart()
      })
      let vue = this
      let interval = window.setInterval(function () { // 自适应父div宽度
        if (!document.getElementById(vue.id)) {
          window.clearInterval(interval)
          return
        }
        vue.parentWidth = document.getElementById(vue.id).parentNode.clientWidth
      }, 1)
    },
    updated () {
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
