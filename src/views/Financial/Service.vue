<template>
  <div class="Hand">
    提币明细
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
  <el-input
    style="margin: 0px 5px 5px"
    v-model="input"
    placeholder="请输入用户昵称查询"
    size:50px
  />
  <el-input style="margin: 0px 5px 5px" v-model="input1" placeholder="请输入手机号查询" size:50px />
  币种：<el-select style="margin: 0px 5px 5px" v-model="value" placeholder="Select">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <el-button style="margin: 0px 5px 5px" type="primary" @click="onSearch">搜索</el-button>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column property="txid" label="邮箱/手机号" align="center" style="width: 12.5%" />
    <el-table-column property="name" label="充币币种" align="center" style="width: 12.5%" />
    <el-table-column property="currency" label="协议名称" align="center" style="width: 12.5%" />
    <el-table-column property="account" label="充币地址" align="center" style="width: 12.5%" />
    <el-table-column property="commission" label="充币数量" align="center" style="width: 12.5%" />
    <el-table-column label="状态" align="center" style="width: 12.5%">
      <template #default="scope">
        <el-tag style="cursor: pointer">{{ scope.row.name }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column property="nickname" label="确认数" align="center" style="width: 12.5%" />
    <el-table-column property="mailbox" label="到账时间" align="center" style="width: 12.5%" />
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
import { TradingList } from '@/api/Financial/currency';

const input = ref('');
const input5 = ref();
const input1 = ref('');
const value = ref('');
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

const tableData = ref([
  {
    members: '',
    trading: '',
    amount: '',
    service: '',
    time: '',
    currency: '',
    apply: '',
  },
]);

const fullscreenLoading = ref(false);
const getData = async () => {
  const res = await TradingList({
    $limit: limit.value,
    $page: page.value,
    keyword: input.value,
    trading: value.value,
    amount: input1.value,
  });
  const { status, data } = res;

  if (status === 200) {
    tableData.value = data.data;
    total1.value = data.total;
    for (const index of tableData.value) {
      const s = dayjs(index.time).format('YYYY-MM-DD HH:mm:ss');
      const b = dayjs(index.apply).format('YYYY-MM-DD HH:mm:ss');
      index.amount += index.currency;
      index.time = s;
      index.apply = b;
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
const openFullScreen1 = () => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    input.value = '';
    value.value = '';
    input1.value = '';
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
