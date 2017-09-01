/**
 * 图表对象例子
 * @type {{title: string, type: string, reverse: boolean, columns: [*], data: [*]}}
 */
const chartObjDemo = {
  title: '图标题',
  type: 'line', // 图类型 ['line','bar','linebar','pie']
  reverse: false, // 是否要颠倒系列里的data数据
  columns: [
    {
      name: 'dim', // 与data中的key一样
      title: '维度', //
      x: true, // 用于x轴
      type: 'line' // 上面的type为'linebar'时才有效
    },
    {
      name: 'index', // 与data中的key一样
      title: '指标', // 即图例
      x: false, // 用于x轴
      type: 'line' // 上面的type为'linebar'时才有效
    }
  ],
  data: [
    {dim: '周一', index: 100},
    {dim: '周二', index: 200}
  ]
}

const chartType = {
  line: 'line',
  bar: 'bar',
  linebar: 'linebar',
  pie: 'pie'
}

function getOption (chartObj) {
  const commonOption = {
    title: {
      text: chartObj.title,
      textStyle: {
        fontSize: 12
      }
    },
    legend: {
      top: 20
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    }
  }
  if (chartType.line === chartObj.type || chartType.bar === chartObj.type || chartType.linebar === chartObj.type) {
    setLineOrBarOption(commonOption, chartObj)
  } else if (chartType.pie === chartObj.type) {
    setPieOption(commonOption, chartObj)
  }
  return commonOption
}

function setLineOrBarOption (commonOption, chartObj) {
  let _legend = []
  let _seriesMap = {}
  let _xKey
  chartObj.columns.forEach(c => {
    if (!c.x) {
      _legend.push(c.title)
      _seriesMap[c.name] = []
    } else {
      _xKey = c.name
    }
  })
  let _xData = []
  chartObj.data.forEach(d => {
    chartObj.columns.forEach(c => {
      if (!c.x) {
        if (chartObj.reverse) {
          _seriesMap[c.name].unshift(d[c.name])
        } else {
          _seriesMap[c.name].push(d[c.name])
        }
      } else {
        if (chartObj.reverse) {
          _xData.unshift(d[c.name])
        } else {
          _xData.push(d[c.name])
        }
      }
    })
  })
  let _series = []
  chartObj.columns.forEach(c => {
    if (!c.x) {
      _series.push({name: c.title, data: _seriesMap[c.name], type: chartObj.type === 'linebar' ? c.type : chartObj.type})
    }
  })
  commonOption.xAxis = {
    boundaryGap: chartObj.type !== 'line',
    type: 'category',
    data: _xData
  }
  commonOption.yAxis = {
    type: 'value'
  }
  commonOption.tooltip = {
    trigger: 'axis'
  }
  commonOption.legend.data = _legend
  commonOption.series = _series
}

function setPieOption (commonOption, chartObj) {
  let _legend = []
  let _data = chartObj.data[0]
  let _series = []
  let _serieData = []
  chartObj.columns.forEach(c => {
    _legend.push(c.title)
    _serieData.push({value: _data[c.name], name: c.title})
  })
  _series.push({
    type: 'pie',
    data: _serieData
  })
  commonOption.legend.data = _legend
  commonOption.legend.orient = 'vertical'
  commonOption.legend.type = 'scroll'
  commonOption.legend.right = 30
  commonOption.legend.top = 40
  commonOption.legend.bottom = 20
  commonOption.tooltip = {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  }
  commonOption.series = _series
}

export {getOption}
