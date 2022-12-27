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
    style="width: 150.0032px; margin: 0px 4.9984px"
    v-model="input21"
    placeholder="请输入交易人搜索"
  />
  <el-input
    style="width: 150.0032px; margin: 0px 4.9984px"
    v-model="input22"
    placeholder="请输入创建人搜索"
    size:50.0032px
  />
  币种：<el-select
    v-model="value1"
    placeholder="全部"
    style="width: 150.0032px; margin: 0px 4.9984px"
  >
    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  交易类型：<el-select
    v-model="value"
    placeholder="全部"
    style="width: 150.0032px; margin: 0px 4.9984px"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>

  <el-button type="primary" @click="onSearch">搜索</el-button>
  <el-button type="primary" @click="postadd">新增</el-button>

  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    border
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="order" label="订单编号" align="center" width="100" />
    <el-table-column label="交易时间" align="center" sortable width="120">
      <template #default="scope">{{ scope.row.ttime }}</template>
    </el-table-column>
    <el-table-column property="dealer" label="交易人" align="center" width="100" />
    <el-table-column property="founder" label="创建人" align="center" width="100" />
    <el-table-column property="currency" label="币种" align="center" width="100" />
    <el-table-column property="type" label="类型" align="center" width="100" />
    <el-table-column property="quantity" label="订单数量" align="center" width="100" />
    <el-table-column property="amount" label="订单金额" align="center" width="100" />
    <el-table-column property="commission" label="手续费" align="center" width="100" />
    <el-table-column property="payment" label="支付方式" align="center" width="100" />
    <el-table-column property="status" label="订单状态" align="center" width="100" />
    <el-table-column property="address" label="操作" align="center" show-overflow-tooltip>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
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
    />跳至<el-input v-model="input5" class="jump" @change="fn" windth />页
  </div>

  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="订单编号" :label-width="formLabelWidth">
        <el-input v-model="form.order" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="交易时间" :label-width="formLabelWidth">
        <el-input v-model="form.ttime" autocomplete="off" />
      </el-form-item>
      <el-form-item label="交易人" :label-width="formLabelWidth">
        <el-input v-model="form.dealer" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="创建人" :label-width="formLabelWidth">
        <el-input v-model="form.founder" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="币种" :label-width="formLabelWidth">
        <el-input v-model="form.currency" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-input v-model="form.type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="订单数量" :label-width="formLabelWidth">
        <el-input v-model="form.quantity" autocomplete="off" />
      </el-form-item>
      <el-form-item label="订单金额" :label-width="formLabelWidth">
        <el-input v-model="form.amount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手续费" :label-width="formLabelWidth">
        <el-input v-model="form.commission" autocomplete="off" />
      </el-form-item>
      <el-form-item label="支付方式" :label-width="formLabelWidth">
        <el-input v-model="form.payment" autocomplete="off" />
      </el-form-item>
      <el-form-item label="订单状态" :label-width="formLabelWidth">
        <el-input v-model="form.status" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible1"> 确认修改 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="centerDialogVisible" title="新增" width="30%" align-center>
    <el-form
      :label-position="right"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="订单编号">
        <el-input v-model="formLabelAlign.order" />
      </el-form-item>
      <el-form-item label="订单日期">
        <el-input v-model="formLabelAlign.ttime" />
      </el-form-item>
      <el-form-item label="交易人">
        <el-input v-model="formLabelAlign.dealer" />
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="formLabelAlign.founder" />
      </el-form-item>
      <el-form-item label="币种">
        <el-input v-model="formLabelAlign.currency" />
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="formLabelAlign.type" />
      </el-form-item>
      <el-form-item label="订单数量">
        <el-input v-model="formLabelAlign.quantity" />
      </el-form-item>
      <el-form-item label="订单金额">
        <el-input v-model="formLabelAlign.amount" />
      </el-form-item>
      <el-form-item label="手续费">
        <el-input v-model="formLabelAlign.commission" />
      </el-form-item>
      <el-form-item label="支付方式">
        <el-input v-model="formLabelAlign.payment" />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-input v-model="formLabelAlign.status" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="postad1"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { RefreshRight } from '@element-plus/icons-vue';
import { ElMessage, ElTable } from 'element-plus';
import {
  onMounted, ref, watch, reactive,
} from 'vue';
import dayjs from 'dayjs';
import {
  TradingList, addKfc, delEvent, editEvent,
} from '@/api/Financial/Fiat';

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
const visible = ref(false);
const centerDialogVisible = ref(false);
const dialogFormVisible = ref(false);
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
const formLabelAlign = reactive({
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
});
let form = reactive({
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
});
const formLabelWidth = '140px';
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
const postadd = () => {
  centerDialogVisible.value = true;
  console.log(formLabelAlign);
};
const postad1 = () => {
  console.log(formLabelAlign);
  centerDialogVisible1();
};
// eslint-disable-next-line consistent-return
const centerDialogVisible1 = async () => {
  const res = await addKfc({ ...formLabelAlign });
  const { status } = res;
  if (status !== 201) return ElMessage('添加失败');
  ElMessage({
    message: '添加成功',
    type: 'success',
  });
  centerDialogVisible.value = false;

  getData();
};
// eslint-disable-next-line consistent-return
const dialogFormVisible1 = async () => {
  console.log(form);
  const { id, ...text } = form;
  const res = await editEvent(id, text);
  const { status } = res;
  if (status !== 200) return ElMessage('修改失败');
  ElMessage({
    message: '修改成功',
    type: 'success',
  });
  dialogFormVisible.value = false;
  getData();
};
const handleEdit = (index: number, row: User) => {
  form = row;
  getData();
  dialogFormVisible.value = true;
  console.log(index, row);
};
// eslint-disable-next-line consistent-return
const handleDelete = async (index: number, row: User) => {
  console.log(index, row);
  const res = await delEvent(row.id);
  const { status } = res;
  if (status !== 200) return ElMessage('删除失败');
  ElMessage({
    message: '删除成功',
    type: 'success',
  });
  getData();
};
const onSearch = () => {
  page.value = 1;
  fullscreenLoading.value = true;
  setTimeout(() => {
    input21.value = '';
    value.value = '';
    input22.value = '';
    value1.value = '';
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
  margin: 4.9984px 4.9984px 0px;
}
.demo-date-picker {
  display: inline-block;
}
::v-deep .el-date-editor--daterange {
  width: 200px;
  height: 38.0032px;
  margin: 4.9984px 4.9984px 0px;
}
.el-table--fit {
  margin-top: 10.0032px;
}
// ::v-deep .el-input__inner {
//   width: 100px;
// }
.el-pagination {
  // position: relative;
  // bottom: -3.0016px;
  // left: 964.9984px;
}
.tang {
  float: right;
  display: flex;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.jump {
  width: 50.0032px;
}
</style>
