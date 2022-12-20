<template>
  <Content title="角色管理">
    <el-button type="primary" class="break">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />
    <el-button type="primary" class="add"> 添加角色 </el-button>
    <el-table :data="tableData" border style="width: 100%; margin-bottom: 10px">
      <el-table-column align="center" prop="date" label="ID" width="100" />
      <el-table-column align="center" prop="name" label="角色名称" />
      <el-table-column align="center" prop="address" label="备注" />
      <el-table-column align="center" fixed="right" label="操作">
        <template #default>
          <el-button type="primary" size="small">修改</el-button>
          <el-button type="danger" size="small">删除</el-button>
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
    name: '客服',
    address: '外部',
  },
  {
    date: '2',
    name: '管理员',
    address: '系统',
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
