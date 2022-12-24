<template>
  <Content title="版本管理">
    <el-button type="primary" class="break" @click="handleRenovate()">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />

    <el-table :data="tableData" border style="width: 100%; margin-bottom: 10px">
      <el-table-column align="center" prop="id" label="ID" width="100" />
      <el-table-column align="center" prop="terrace" label="平台" />
      <el-table-column align="center" prop="current" label="当前版本" />
      <el-table-column align="center" fixed="right" label="操作">
        <template #default>
          <el-button type="primary" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next,sizes" :total="10" class="page" />
  </Content>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import VersionApi from '@/api/version';

export default defineComponent({
  name: 'versionPage',
  data() {
    return {
      tableData: [
        {
          date: '1',
          terrace: '',
          current: '',
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleRenovate() {
      window.location.reload();
    },
    // 获取列表
    async getData() {
      const res = await VersionApi.getEventList({});
      console.log('res', res);
      const { status, data } = res;
      if (status === 200) {
        this.tableData = data.data;
        console.log(this.tableData);
      }
    },
  },
});
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
