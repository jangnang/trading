<template>
  <div class="Hand">
    法币交易管理
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
    style="width: 150px; margin: 0px 5px"
    v-model="input21"
    placeholder="请输入交易人搜索"
  />
  <el-input
    style="width: 150px; margin: 0px 5px"
    v-model="input22"
    placeholder="请输入创建人搜索"
    size:50px
  />
  交易类型：<el-select v-model="value" placeholder="Select" style="width: 150px; margin: 0px 5px">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker v-model="value1" type="daterange" start-placeholder="选择时间区间" />
    </div>
  </div>
  <el-button type="primary" @click="onSearch">搜索</el-button>

  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="name" label="订单编号" width="100" />
    <el-table-column label="交易时间" sortable width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column property="name" label="交易人" width="100" />
    <el-table-column property="name" label="创建人" width="100" />
    <el-table-column property="name" label="币种" width="100" />
    <el-table-column property="name" label="类型" width="100" />
    <el-table-column property="name" label="订单数量" width="100" />
    <el-table-column property="name" label="订单金额" width="100" />
    <el-table-column property="name" label="手续费" width="100" />
    <el-table-column property="name" label="支付方式" width="100" />
    <el-table-column property="name" label="订单状态" width="100" />
    <el-table-column property="address" label="操作" show-overflow-tooltip>
      <el-button size="small">查看</el-button>
    </el-table-column>
  </el-table>
  <div class="tang">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total1"
      :page-size="limit"
      v-model:current-page="page"
      @current-change="onPageChange"
    />跳至<el-input v-model="input5" class="jump" @change="fn" windth />页
  </div>
</template>
<script setup lang="ts">
import { RefreshRight } from '@element-plus/icons-vue';
import { ElMessage, ElTable } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { TradingList } from '@/api/Financial/Trading';

interface User {
  date: string;
  name: string;
  address: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const input = ref('');
const input21 = ref('');
const input22 = ref('');
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
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];

const fullscreenLoading = ref(false);
const getData = async () => {
  const res = await TradingList({
    $limit: limit.value,
    $page: page.value,
    keyword: input.value,
    trading: value.value,
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
// ::v-deep .el-input__inner {
//   width: 100px;
// }
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
