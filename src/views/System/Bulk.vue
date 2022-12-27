<template>
  <Content title="币种协议管理">
    <el-button type="primary" class="break" @click="handleRenovate()">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />

    <el-button type="primary" class="add" @click="dialogFormVisible = true"> 添加协议 </el-button>
    <el-dialog v-model="dialogFormVisible" title="添加协议">
      <el-form :model="form">
        <el-form-item label="协议ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="协议名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="区块浏览器" :label-width="formLabelWidth">
          <el-input v-model="form.browser" autocomplete="off" />
        </el-form-item>
        <el-form-item label="协议主币名" :label-width="formLabelWidth">
          <el-input v-model="form.coin" autocomplete="off" />
        </el-form-item>
        <el-form-item label="链ID" :label-width="formLabelWidth">
          <el-input v-model="form.chain" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-table :data="tableData" border style="width: 100%; margin-bottom: 10px">
      <el-table-column align="center" prop="id" label="协议编号" width="100" />
      <el-table-column align="center" prop="name" label="协议名称" />
      <el-table-column align="center" prop="browser" label="区块浏览器" />
      <el-table-column align="center" prop="coin" label="协议主币名" />
      <el-table-column align="center" prop="chain" label="链ID" />
      <el-table-column align="center" fixed="right" label="操作">
        <template #default>
          <el-button type="primary" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      small
      background
      layout="prev, pager, next,sizes"
      :total="total"
      class="mt-4"
      :page-sizes="[5, 10, 30, 50]"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </Content>
</template>

<script>
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import BulkApi from '@/api/System/bulk';

export default defineComponent({
  name: 'bulkPage',
  data() {
    return {
      page: 1,
      total: 0,
      limit: 10,
      form: {
        id: '',
        name: '',
        browser: '',
        coin: '',
        chain: '',
      },
      dialogFormVisible: false,
      formLabelWidth: '100px',
      tableData: [
        {
          id: '1',
          name: '',
          browser: '',
          coin: '',
          chain: '',
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.getData();
  },
  watch: {
    page(nv) {
      console.log('页码的值', nv);
    },
  },
  methods: {
    handleRenovate() {
      window.location.reload();
      console.log('click');
    },
    handlePageChange(res) {
      console.log('页面发生了变化', res);
      this.page = res;
      this.getData();
    },
    handleSizeChange(res) {
      console.log('每页条数发生变化', res);
      this.limit = res;
      this.getData();
    },
    // 获取列表
    async getData() {
      const res = await BulkApi.getEventList({ $limit: this.limit, $page: this.page });
      console.log('res', res);
      const { status, data } = res;
      if (status === 200) {
        this.tableData = data.data;
        console.log(this.tableData);
        this.total = data.total;
      }
    },
    // 添加数据
    async confirm() {
      console.log('添加', this.form);
      const {
        id, name, browser, coin, chain,
      } = this.form;

      const res = await BulkApi.addEvent({
        id,
        name,
        browser,
        coin,
        chain,
      });
      console.log('res', res);

      // 添加成功提示
      const { statusText, data } = res;
      if (statusText === 'Created') {
        ElMessage({
          message: '添加成功',
          type: 'success',
        });

        // 关闭
        this.dialogFormVisible = false;

        // 清空表单
        this.form = {
          id,
          name,
          browser,
          coin,
          chain,
        };

        // 重新获取页面数据
        this.getData();
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
