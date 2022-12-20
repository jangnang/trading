<template>
  <Content title="币种管理">
    <el-button type="primary" class="break">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />
    <el-button type="primary" class="add"> 添加币种 </el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="name" label="中文名" width="200" />
      <el-table-column align="center" prop="definition" label="名称(英文)" width="200" />
      <el-table-column align="center" prop="city" label="币种缩写" width="200" />
      <el-table-column align="center" prop="address" label="账户类型" width="200" />
      <el-table-column align="center" prop="open" label="RPC" width="200">
        <template #default>
          <el-button type="success" size="small" @click="handleOpen">开放</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="close" label="自动转账" width="200">
        <template #default>
          <el-button type="danger" size="small" @click="handleClose">关</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="cash" label="提现" width="200" />
      <el-table-column align="center" prop="more" label="充值" width="200" />
      <el-table-column align="center" prop="state" label="状态" width="200">
        <template #default>
          <el-button type="success" size="small" @click="handleClose">启用</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="block" label="区块高度" width="200" />
      <el-table-column align="center" prop="quota" label="会员总余额" width="400" />
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">详细</el-button>
          <el-button link type="primary" size="small" @click="handleMore">更多</el-button>
        </template>
      </el-table-column>
    </el-table>
  </Content>
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log('click1');
};
const handleMore = () => {
  console.log('click2');
};
const handleOpen = () => {
  console.log('click3');
};
const handleClose = () => {
  console.log('click4');
};

const tableData = [
  {
    name: '',
    definition: '',
    city: '',
    address: '',
    open: '',
    close: '',
    cash: '',
    more: '',
    block: '',
    quota: '',
  },
];
</script>

<style lang="scss" scoped>
.break {
  position: absolute;
  top: 100px;
  right: 25px;
}
.add {
  float: right;
  margin-bottom: 20px;
}

::v-deep .el-table thead {
  color: #000000;
}

::v-deep .el-table th.el-table__cell.is-leaf {
  background-color: rgb(250, 250, 250);
}
</style>
