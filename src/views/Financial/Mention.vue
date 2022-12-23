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
  哈希：<el-input style="width: 120px" v-model="input6" placeholder="输入哈希值" size:50px />
  提交时间：
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker
        style="width: 320px"
        v-model="value1"
        type="datetimerange"
        start-placeholder="开始"
        end-placeholder="结束"
        :default-time="defaultTime2"
      />
    </div>
  </div>
  审核时间：
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker
        style="width: 320px"
        v-model="value2"
        type="datetimerange"
        start-placeholder="开始"
        end-placeholder="结束"
        :default-time="defaultTime2"
      />
    </div>
  </div>
  <br />
  <el-button type="primary" @click="onSearch" size="small">搜索</el-button>
  <el-button type="success" @click="ExportXlsx" size="small">导出</el-button>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column property="mailbox" label="邮箱/手机号" align="center" style="width: 8.3vw" />
    <el-table-column property="money" label="提现币种" align="center" style="width: 8.3vw" />
    <el-table-column property="agreement" label="协议名称" align="center" style="width: 8.3vw" />
    <el-table-column property="address" label="到账地址" align="center" style="width: 8.3vw" />
    <el-table-column property="quantity" label="提现数量" align="center" style="width: 8.3vw" />
    <el-table-column property="commission" label="手续费" align="center" style="width: 8.3vw" />
    <el-table-column property="received" label="到账数量" align="center" style="width: 8.3vw" />
    <el-table-column property="arrival" label="提现时间" align="center" style="width: 8.3vw" />
    <el-table-column property="time" label="审核时间" align="center" style="width: 8.3vw" />
    <el-table-column property="hash" label="Hash" align="center" style="width: 8.3vw" />
    <el-table-column label="状态" align="center" style="width: 8.3vw">
      <template #default="scope">
        <template v-if="scope.row.state == 0">
          <el-button type="danger" size="small">失败</el-button>
        </template>
        <template v-else-if="scope.row.state == 1">
          <el-button type="info" size="small">驳回</el-button>
        </template>
        <template v-else-if="scope.row.state == 2">
          <el-button type="success" size="small">待处理</el-button>
        </template>
        <template v-else-if="scope.row.state == 3">
          <el-button type="warning" size="small">处理中</el-button>
        </template>
        <template v-else-if="scope.row.state == 4">
          <el-button type="primary" size="small">已处理</el-button>
        </template>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" style="width: 8.3vw">
      <template #default="scope">
        <template v-if="scope.row.operation == 0">
          <el-button type="danger" size="small" @click="pack(scope.row)">重新打包</el-button>
        </template>
        <template v-else-if="scope.row.operation == 1">
          <el-button type="info" size="small">提现已关闭</el-button>
        </template>
        <template v-else-if="scope.row.operation == 2">
          <el-button type="success" size="small">等待中处理</el-button>
        </template>
        <template v-else-if="scope.row.operation == 3">
          <el-button type="warning" size="small">正在处理</el-button>
        </template>
        <template v-else-if="scope.row.operation == 4">
          <el-button type="primary" size="small">提现已完成</el-button>
        </template>
      </template>
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
    />跳至<el-input v-model="input5" class="jump" @change="fn" />页
  </div>
</template>
<script setup lang="ts">
import { RefreshRight } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import {
  onMounted, ref, watch, reactive, toRefs,
} from 'vue';
import dayjs from 'dayjs';
import { exportExcel } from '@/api/export';
import { TradingList } from '@/api/Financial/Mention';

const input = ref('');
const input6 = ref('');
const input5 = ref();
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input4 = ref('');
const value = ref('');
const value1 = ref('');
const value2 = ref('');
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
    value: '1',
    label: '驳回',
  },
  {
    value: '2',
    label: '待处理',
  },
  {
    value: '3',
    label: '处理中',
  },
  {
    value: '4',
    label: '已处理',
  },
  {
    value: '0',
    label: '失败',
  },
];
let tableData = reactive([
  {
    state: '',
    arrival: '',
    members: '',
    trading: '',
    amount: '',
    service: '',
    time: '',
    currency: '',
  },
]);
toRefs(tableData);
const defaultTime2: [Date, Date] = [new Date(2000, 1, 1, 12, 0, 0), new Date(2000, 2, 1, 8, 0, 0)];
const fullscreenLoading = ref(false);
watch(input2, (count, prevCount) => {
  console.log(input2.value);
});
const getData = async () => {
  const res = await TradingList({
    $limit: limit.value,
    $page: page.value,
    keyword: input.value, // 邮箱
    trading: value.value, // 币种
    amount: input1.value, // 手机号
    amount1: input2.value, // 到账地址
    service: input3.value, // 协议
    service1: input4.value, // 状态
    createdAt: value1.value, // 提交时间
    createdAt1: value2.value, // 审核时间
    hash: input6.value, // 哈希
  });
  const { status, data } = res;

  if (status === 200) {
    tableData = data.data;
    total1.value = data.total;
    for (const index of tableData) {
      const s = dayjs(index.time).format('YYYY-MM-DD HH:mm:ss');
      const c = dayjs(index.arrival).format('YYYY-MM-DD HH:mm:ss');
      index.amount += index.currency;
      index.time = s;
      index.arrival = c;
    }
  }
};

const onSearch = () => {
  page.value = 1;
  fullscreenLoading.value = true;
  setTimeout(() => {
    getData();
    fullscreenLoading.value = false;
  }, 500);
  console.log(input4.value);

  getData();
};
const pack = (index) => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    getData();
    fullscreenLoading.value = false;
  }, 500);
  index.state = 3;
  index.operation = 3;
  ElMessage({
    showClose: true,
    message: '重新打包成功',
    type: 'success',
  });
  console.log(index);

  // getData();
};
const ExportXlsx = () => {
  const titleArr = ['id', '会员ID', '交易类型', '交易金额', '', '交易手续费', '交易时间', '', ''];

  exportExcel(tableData, 'test', titleArr, 'sheetName');
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
  }, 500);
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

.tang {
  float: right;
  display: flex;
}
.jump {
  width: 50px;
}
</style>
