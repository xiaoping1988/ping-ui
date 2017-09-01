import PWaves from './Waves.vue'
import PChart from './chart/Chart.vue'

const PingUI = {
  install: function (Vue, options) {
    Vue.component('p-waves', PWaves)
    Vue.component('p-chart', PChart)
  }
}

export default PingUI
