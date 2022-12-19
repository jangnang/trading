<template>
  <Content title="系统信息维护">
    <el-button type="primary" class="break">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />
    <el-button type="primary" class="add"> 新增 </el-button>
    <el-table :data="tableData" border style="width: 100%; margin-bottom: 10px">
      <el-table-column align="center" prop="date" label="ID" width="100" />
      <el-table-column align="center" prop="key" label="键" />
      <el-table-column align="center" prop="value" label="值" />
      <el-table-column align="center" prop="address" label="备注" />
      <el-table-column align="center" prop="createTime" label="创建时间" />
      <el-table-column align="center" prop="updateTime" label="更新时间" />
      <el-table-column align="center" fixed="right" label="操作">
        <template #default>
          <el-button type="primary" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="10" class="page" />
  </Content>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '1',
    key: '',
    value: '',
    address: '',
    createTime: '',
    updateTime: '',
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
  margin-left: 5px;
}
.del {
  float: right;
  margin-bottom: 20px;
  margin-left: 5px;
}

::v-deep .el-table thead {
  color: #000000;
}

::v-deep .el-table th.el-table__cell.is-leaf {
  background-color: rgb(250, 250, 250);
}
</style>
