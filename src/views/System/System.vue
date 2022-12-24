<template>
  <div>系统日志</div>
</template>

<!-- <template>
  <Content title="系统日志">
    <el-button type="primary" class="break">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />
    <el-input
      v-model="input2"
      class="w-50 m-2"
      style="width: 200px"
      placeholder="请输入用户名搜索"
    />
    <el-dropdown class="option">
      <el-button class="options">
        请选择...<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button type="primary" size="small"> 搜索 </el-button>
    <el-table :data="tableData" border style="width: 100%; margin-bottom: 10px">
      <el-table-column align="center" prop="address" label="IP地址" width="100" />
      <el-table-column align="center" prop="request" label="请求方法" />
      <el-table-column align="center" prop="createTime" label="创建时间" />
      <el-table-column align="center" prop="people" label="操作人" />
      <el-table-column align="center" prop="operation" label="操作" />
      <el-table-column align="center" prop="url" label="操作路径" />
      <el-table-column align="center" prop="modular" label="操作模块" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="10" class="page" />
  </Content>
</template> -->

<!-- <script lang="ts" setup>
import { ref } from 'vue';

const input2 = ref('');

const tableData = [
  {
    address: '1',
    request: '',
    createTime: '',
    people: '',
    operation: '',
    url: '',
    modular: '',
  },
];
</script> -->

<!-- <style lang="scss" scoped>
.break {
  position: absolute;
  top: 100px;
  right: 25px;
}

.option {
  margin: 0px 20px 20px 20px;
}
.options {
  color: rgb(169, 169, 169);
  width: 200px;
}
.el-icon--right {
  margin-left: 100px;
}
::v-deep .el-table thead {
  color: #000000;
}

::v-deep .el-table th.el-table__cell.is-leaf {
  background-color: rgb(250, 250, 250);
}
</style> -->
