import Vue from 'vue'
import Router from 'vue-router'
import Waves from '../demos/Waves'
import Chart from '../demos/Chart'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/waves',
      name: 'waves',
      component: Waves
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart
    }
  ]
})

export default router
