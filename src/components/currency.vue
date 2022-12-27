<template>
  <!--  ECharts默认宽高是0，如果不设置页面是不显示的-->
  <div ref="mychart" id="demoDIV"></div>
</template>

<script>
// 1:引用echarts
import * as echarts from 'echarts';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'The',
  data() {
    return {};
  },
  mounted() {
    const myChart = echarts.init(this.$refs.mychart);
    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round(value),
        ],
      };
    }
    const data = [];
    let now = new Date(2019, 1, 3);
    let oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;
    for (let i = 0; i < 1000; i += +1) {
      data.push(randomData());
    }
    // 设置参数
    myChart.setOption({
      title: {
        text: '法币成交量趋势图 ',
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          // eslint-disable-next-line prefer-destructuring
          params = params[0];
          const date = new Date(params.name);
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${
            params.value[1]
          }`;
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: true,
        },
      },
      series: [
        {
          name: 'Fake Data',
          type: 'line',
          showSymbol: false,
          data,
        },
      ],
    });
    setInterval(() => {
      for (let i = 0; i < 5; i += i + 1) {
        data.shift();
        data.push(randomData());
      }
      myChart.setOption({
        series: [
          {
            data,
          },
        ],
      });
    }, 2000);
  },
});
</script>

<style>
#demoDIV {
  width: 80%;
  height: 300px;
  margin-left: 60px;
  background: floralwhite;
}
</style>
