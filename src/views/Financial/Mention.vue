<template>
  <div class="Hand">
    提币审核
    <el-button
      type="primary"
      :icon="RefreshRight"
      style="float: right"
      v-loading.fullscreen.lock="fullscreenLoading"
      @click="openFullScreen1"
      >刷新</el-button
    >
  </div>
  <br />
  <hr />
  邮箱：<el-input style="width: 120px" v-model="input" placeholder="输入邮箱" size:50px />
  手机号：<el-input style="width: 120px" v-model="input1" placeholder="输入手机号" size:50px />
  到账地址：<el-input style="width: 120px" v-model="input2" placeholder="输入到账地址" size:50px />
  币种：<el-select style="margin: 0px 5px 5px; width: 120px" v-model="value" placeholder="全部">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  协议：<el-select style="margin: 0px 5px 5px; width: 120px" v-model="input3" placeholder="全部">
    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <br />
  状态：<el-select style="margin: 0px 5px 5px; width: 120px" v-model="input4" placeholder="全部">
    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker v-model="value1" type="daterange" start-placeholder="选择时间区间" />
    </div>
  </div>
  <el-button type="primary" @click="onSearch">搜索</el-button>
  <el-button type="success" @click="ExportXlsx">导出</el-button>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="members" label="会员ID" align="center" style="width: 20%" />
    <el-table-column prop="trading" label="交易类型" align="center" style="width: 20%" />
    <el-table-column prop="amount" label="交易金额" align="center" style="width: 20%" />
    <el-table-column prop="service" label="交易手续费" align="center" style="width: 20%" />
    <el-table-column prop="time" label="交易时间" />
  </el-table>
  <div class="tang">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total1"
      :page-size="limit"
      v-model:current-page="page"
      @current-change="onPageChange"
    />跳至<el-input v-model="input5" class="jump" @change="fn" />页
  </div>
</template>
<script setup lang="ts">
import { RefreshRight } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { exportExcel } from '@/api/export';
import { TradingList } from '@/api/Financial/Trading';

const input = ref('');
const input5 = ref();
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input4 = ref('');
const value = ref('');
const value1 = ref('');
const limit = ref(5);
const page = ref(1);
const total1 = ref('');
const options = [
  {
    value: 'USDT',
    label: 'USDT',
  },
  {
    value: 'BTC',
    label: 'BTC',
  },
  {
    value: 'BNB',
    label: 'BNB',
  },
  {
    value: 'ETH',
    label: 'ETH',
  },
];
const options1 = [
  {
    value: 'ETH Ethereum (ERC20)',
    label: 'ETH Ethereum (ERC20)',
  },
  {
    value: 'Bitcoin',
    label: 'Bitcoin',
  },
  {
    value: 'TRX Tron (TRC20)',
    label: 'TRX Tron (TRC20)',
  },
  {
    value: 'BSC Binance Smart Chain (BEP20)',
    label: 'BSC Binance Smart Chain (BEP20)',
  },
];
const options2 = [
  {
    value: '驳回',
    label: '驳回',
  },
  {
    value: '待处理',
    label: '待处理',
  },
  {
    value: '处理中',
    label: '处理中',
  },
  {
    value: '已处理',
    label: '已处理',
  },
  {
    value: '失败',
    label: '失败',
  },
];

const tableData = ref([
  {
    members: '',
    trading: '',
    amount: '',
    service: '',
    time: '',
    currency: '',
  },
]);

const fullscreenLoading = ref(false);
watch(input2, (count, prevCount) => {
  console.log(input2.value);
});
const getData = async () => {
  const res = await TradingList({
    $limit: limit.value,
    $page: page.value,
    keyword: input.value,
    trading: value.value,
    amount: input1.value,
    amount1: input2.value,
    service: input3.value,
    service1: input4.value,
    createdAt: value1.value,
  });
  const { status, data } = res;

  if (status === 200) {
    tableData.value = data.data;
    total1.value = data.total;
    for (const index of tableData.value) {
      const s = dayjs(index.time).format('YYYY-MM-DD HH:mm:ss');
      index.amount += index.currency;
      index.time = s;
    }
  }
};

const onSearch = () => {
  page.value = 1;
  fullscreenLoading.value = true;
  setTimeout(() => {
    getData();
    fullscreenLoading.value = false;
  }, 1000);
  getData();
};
const ExportXlsx = () => {
  const titleArr = ['id', '会员ID', '交易类型', '交易金额', '', '交易手续费', '交易时间', '', ''];

  exportExcel(tableData.value, 'test', titleArr, 'sheetName');
};
const openFullScreen1 = () => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    input.value = '';
    input1.value = '';
    input2.value = '';
    input3.value = '';
    input4.value = '';
    value.value = '';
    value1.value = '';
    getData();
    fullscreenLoading.value = false;
  }, 1000);
};
input5.value = page.value;
watch(page, (count, prevCount) => {
  input5.value = page.value;
  console.log(input5.value);
});

const onPageChange = (page) => {
  page = page.value;
  getData();
};
const fn = () => {
  const sn = Math.ceil(total1.value / limit.value);
  if (input5.value > sn || input5.value < 1) {
    input5.value = page.value;
    ElMessage.error('请求页码错误');
  }
  page.value = Number(input5.value);
  openFullScreen1();
  getData();
};
onMounted(async () => {
  await getData();
});
</script>
<style scoped lang="scss">
.Hand {
  font: bold 24px/24px '';
}

.el-input {
  width: 200px;
}
.w-50 {
  width: 120px;
  margin: 5px 5px 0px;
}
.demo-date-picker {
  display: inline-block;
}
::v-deep .el-date-editor--daterange {
  width: 200px;
  height: 38px;
  margin: 5px 5px 0px;
}
.el-table--fit {
  margin-top: 10px;
}
.el-pagination {
  // position: relative;
  // bottom: -3px;
  // left: 965px;
}
.tang {
  float: right;
  display: flex;
}
.jump {
  width: 50px;
}
</style>
