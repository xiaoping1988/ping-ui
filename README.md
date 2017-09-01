# ping-ui

> A UI components Library with Vue.js ,https://xiaoping1988.github.io/index.html#/

> 包含一些echarts和粒子系统的共用组件

## NPM安装

npm install ping-ui --save

import PingUI from 'ping-ui'

Vue.use(PingUI)

## 帮助文档

### echarts组件

<p-chart :data="chartData" id="chart"></p-chart>

可参考src/demos/Chart.vue,一个页面多个图表时一定要设置唯一ID

目前已实现折线图、柱状图、饼状图

chartData格式示例:

    折线图或者柱状图:
    {                
      title: '图标题',
      type: 'line', // 图类型 ['line','bar','linebar','pie']
      reverse: false, // 是否要颠倒系列里的data数据
      columns: [
        {
          name: 'dim', // 与data中的key一样
          title: '维度', //
          x: true // 用于x轴
        },
        {
          name: 'index', // 与data中的key一样
          title: '指标' // 即图例
        }
      ],
      data: [
        {dim: '周一', index: 800},
        {dim: '周二', index: 600},
        {dim: '周三', index: 500},
        {dim: '周四', index: 400},
        {dim: '周五', index: 500},
        {dim: '周六', index: 600},
        {dim: '周日', index: 700}
      ]         
    }
    
    
    折线柱状混图:
    {                
      title: '图标题',
      type: 'linebar', // 图类型 ['line','bar','linebar','pie']
      reverse: false, // 是否要颠倒系列里的data数据
      columns: [
          {
            name: 'dim', // 与data中的key一样
            title: '维度', //
            x: true // 用于x轴
          },
         {
           name: 'index1', // 与data中的key一样
           title: '指标1', // 即图例
           type: 'line' // 上面的type为'linebar'时才有效
         },
         {
           name: 'index2', // 与data中的key一样
           title: '指标2', // 即图例
           type: 'bar' // 上面的type为'linebar'时才有效
         }
      ],
      data: [
         {dim: '周一', index1: 100, index2: 800},
         {dim: '周二', index1: 200, index2: 600},
         {dim: '周三', index1: 300, index2: 400},
         {dim: '周四', index1: 400, index2: 300},
         {dim: '周五', index1: 500, index2: 500},
         {dim: '周六', index1: 600, index2: 700},
         {dim: '周日', index1: 700, index2: 900}
      ]         
    }
    
    
      饼状图:
     {
       title: '饼状图标题',
       type: 'pie', // 图类型 ['line','bar','linebar','pie']
       reverse: false, // 是否要颠倒系列里的data数据
       columns: [
         {
           name: 'index1', // 与data中的key一样
           title: '指标1' // 即图例
         },
         {
           name: 'index2', // 与data中的key一样
           title: '指标2' // 即图例
         },
         {
           name: 'index3', // 与data中的key一样
           title: '指标3' // 即图例
         },
         {
           name: 'index4', // 与data中的key一样
           title: '指标4' // 即图例
         }
       ],
       data: [
         {index1: 100, index2: 800, index3: 200, index4: 400}
       ]
     }


### 粒子系统waves组件


<p-waves color="#00BFFF"></p-waves>

color是指粒子颜色

可参考src/demos/Waves.vue


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
