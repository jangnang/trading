<template>
  <Content title="权限管理">
    <el-button type="primary" class="break">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />
    <el-button type="primary" class="add"> 添加权限 </el-button>
    <el-button type="danger" class="del"> 删除权限 </el-button>
    <el-table :data="tableData" border style="width: 100%; margin-bottom: 10px">
      <el-table-column align="center" type="selection" width="100" />
      <el-table-column align="center" prop="date" label="序号" width="100" />
      <el-table-column align="center" prop="parent" label="父级ID" />
      <el-table-column align="center" prop="title" label="权限标题" />
      <el-table-column align="center" prop="name" label="权限名称" />
      <el-table-column align="center" prop="describe" label="权限描述" />
      <el-table-column align="center" fixed="right" label="操作">
        <template #default>
          <el-button type="primary" size="small">查看 / 编辑</el-button>
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
    parent: '',
    title: '',
    name: '',
    describe: '',
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
