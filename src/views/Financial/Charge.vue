<template>
  <div class="Hand">
    手续费管理
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

  交易类型：<el-select v-model="value" placeholder="Select">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker v-model="value1" type="daterange" start-placeholder="选择时间区间" />
    </div>
  </div>
  <el-button type="primary" @click="onSearch">搜索</el-button>
  <el-button type="success" @click="ExportXlsx">导出</el-button>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="members" label="会员ID" style="width: 25%" />
    <el-table-column prop="trading" label="交易类型" style="width: 25%" />
    <el-table-column prop="createdAt" label="交易时间" />
    <el-table-column prop="service" label="交易手续费" style="width: 25%" />
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
import { BTable } from 'bootstrap-vue';
import * as XLSX from 'xlsx'; // Vue3 版本
import { RefreshRight } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { TradingList } from '@/api/Financial/Trading';
import { exportExcel } from '@/api/export';

const input5 = ref();
const value = ref('');
const value1 = ref('');
const limit = ref(5);
const page = ref(1);
const total1 = ref('');
const options = [
  {
    value: '充值',
    label: '充值',
  },
  {
    value: '转账',
    label: '转账',
  },
  {
    value: '提现',
    label: '提现',
  },
  {
    value: '币币交易',
    label: '币币交易',
  },
];

const tableData = ref([
  {
    members: '',
    trading: '',
    amount: '',
    service: '',
    createdAt: '',
    updatedAt: '',
  },
]);
const fullscreenLoading = ref(false);

const getData = async () => {
  const timi = dayjs(value1.value[0]).format('YYYY-MM-DD HH:mm:ss');
  const timis = dayjs(value1.value[1]).format('YYYY-MM-DD HH:mm:ss');
  const res = await TradingList({
    $limit: limit.value,
    $page: page.value,
    trading: value.value,
  });
  const { status, data } = res;

  if (status === 200) {
    tableData.value = data.data;
    total1.value = data.total;
    for (const index of tableData.value) {
      const s = dayjs(index.createdAt).format('YYYY-MM-DD HH:mm:ss');
      const c = dayjs(index.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      index.createdAt = s;
      index.updatedAt = c;
    }
  }
};
const ExportXlsx = () => {
  const titleArr = ['id', '会员ID', '交易类型', '交易金额', '交易手续费']; // 表头中文名
  exportExcel(tableData.value, 'test', titleArr, 'sheetName');
};

const onSearch = () => {
  page.value = 1;
  getData();
};
const openFullScreen1 = () => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    getData();
    fullscreenLoading.value = false;
  }, 1000);
};
input5.value = page.value;
watch(page, (count, prevCount) => {
  input5.value = page.value;
  console.log(input5.value);
});
const onPageChange = (page: { value: any; }) => {
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
