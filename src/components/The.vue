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
    // 设置参数
    myChart.setOption({
      // echarts标题
      // 传入x轴参数
      title: {
        text: '三，四季度注册认证人数',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['邮箱注册', '手机号注册', '未实名认证', '已实名认证', '双重绑定'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {},
      //   },
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['七月', '八月', '九月', '十月', '十一月', '十二月'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '邮箱注册',
          type: 'line',
          stack: 'Total',
          data: [132, 101, 134, 90, 230, 210],
        },
        {
          name: '手机号注册',
          type: 'line',
          stack: 'Total',
          data: [182, 191, 234, 290, 330, 310],
        },
        {
          name: '未实名认证',
          type: 'line',
          stack: 'Total',
          data: [232, 201, 154, 190, 330, 410],
        },
        {
          name: '已实名认证',
          type: 'line',
          stack: 'Total',
          data: [332, 301, 334, 390, 330, 320],
        },
        {
          name: '双重绑定',
          type: 'line',
          stack: 'Total',
          data: [932, 901, 934, 1290, 1330, 1320],
        },
      ],
    });
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
