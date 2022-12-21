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
  币种：<el-select v-model="value1" placeholder="Select" style="width: 150px; margin: 0px 5px">
    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  交易类型：<el-select v-model="value" placeholder="Select" style="width: 150px; margin: 0px 5px">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>

  <el-button type="primary" @click="onSearch">搜索</el-button>

  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="order" label="订单编号" width="100" />
    <el-table-column label="交易时间" sortable width="120">
      <template #default="scope">{{ scope.row.ttime }}</template>
    </el-table-column>
    <el-table-column property="dealer" label="交易人" width="100" />
    <el-table-column property="founder" label="创建人" width="100" />
    <el-table-column property="currency" label="币种" width="100" />
    <el-table-column property="type" label="类型" width="100" />
    <el-table-column property="quantity" label="订单数量" width="100" />
    <el-table-column property="amount" label="订单金额" width="100" />
    <el-table-column property="commission" label="手续费" width="100" />
    <el-table-column property="payment" label="支付方式" width="100" />
    <el-table-column property="status" label="订单状态" width="100" />
    <el-table-column property="address" label="操作" show-overflow-tooltip>
      <el-button size="small" @click="view(tableData.values)">查看</el-button>
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
import { TradingList } from '@/api/Financial/Fiat';

interface User {
  order: string;
  ttime: string;
  dealer: string;
  founder: string;
  currency: string;
  type: string;
  quantity: number;
  amount: number;
  commission: number;
  payment: string;
  status: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
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
const options1 = [
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
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
const tableData = ref([
  {
    id: '',
    order: '',
    ttime: '',
    dealer: '',
    founder: '',
    currency: '',
    type: '',
    quantity: '',
    amount: '',
    commission: '',
    payment: '',
    status: '',
  },
]);

const fullscreenLoading = ref(false);
const getData = async () => {
  const res = await TradingList({
    $limit: limit.value,
    $page: page.value,
    keyword: input21.value,
    trading: value.value,
    founder: input22.value,
    currency: value1.value,
  });
  const { status, data } = res;
  console.log(data);

  if (status === 200) {
    tableData.value = data.data;
    total1.value = data.total;
    for (const index of tableData.value) {
      const s = dayjs(index.ttime).format('YYYY-MM-DD HH:mm:ss');
      index.ttime = s;
    }
  }
};
const view = (index) => {
  console.log(index);
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
