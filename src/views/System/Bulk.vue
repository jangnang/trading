<template>
  <Content title="币种协议管理">
    <el-button type="primary" class="break" @click="handleRenovate()">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />

    <el-drawer v-model="showEdit" title="修改币种协议管理信息">
      <el-form :model="form">
        <el-form-item label="协议名称" :label-width="LabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="区块浏览器" :label-width="LabelWidth">
          <el-input v-model="form.browser" autocomplete="off" />
        </el-form-item>
        <el-form-item label="协议主币名" :label-width="LabelWidth">
          <el-input v-model="form.coin" autocomplete="off" />
        </el-form-item>
        <el-form-item label="链ID" :label-width="LabelWidth">
          <el-input v-model="form.chain" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="demo-drawer__footer">
          <el-button @click="showEdit = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确定</el-button>
        </span>
      </template>
    </el-drawer>

    <el-table :data="tableData" border style="width: 100%; margin-bottom: 10px">
      <el-table-column align="center" prop="id" label="协议编号" width="100" />
      <el-table-column align="center" prop="name" label="协议名称" />
      <el-table-column align="center" prop="browser" label="区块浏览器" />
      <el-table-column align="center" prop="coin" label="协议主币名" />
      <el-table-column align="center" prop="chain" label="链ID" />
      <el-table-column align="center" fixed="right" label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEditOpen(row)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
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
import { ElMessageBox, ElNotification } from 'element-plus';
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
        name: '',
        browser: '',
        coin: '',
        chain: '',
      },
      dialogFormVisible: false,
      formLabelWidth: '100px',
      LabelWidth: '50px',
      dialog: false,
      id: 1,
      formId: '',
      showEdit: false,
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
    // 修改
    handleEditOpen(row) {
      console.log('要修改的内容', row);
      const {
        id, name, browser, coin, chain, ...info
      } = row;
      this.formId = id;
      this.form = {
        ...info,
        name,
        browser,
        coin,
        chain: chain.split(','),
      };
      this.showEdit = true;
    },
    // 修改数据
    // eslint-disable-next-line consistent-return
    async confirmEdit() {
      const res = await BulkApi.editEvent(this.formId, {
        ...this.form,
        name: this.form.name,
        browser: this.form.browser,
        coin: this.form.coin,
        chain: this.form.chain.join(),
      });
      console.log('res', res);
      const { statusText } = res;
      if (statusText === 'OK') {
        ElNotification({
          title: '成功',
          message: '该信息修改成功',
          type: 'success',
        });
      }
      this.getData();
      this.showEdit = false; // 关闭弹窗
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
    // 删除
    handleDelete(id) {
      console.log('要删除的id', id);
      ElMessageBox.confirm('该操作无法撤回请问是否继续删除?', '请确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        // eslint-disable-next-line consistent-return
        .then(async () => {
          console.log('确认');
          const res = await BulkApi.delEvent(id);
          console.log('删除的结果', res);
          const { statusText } = res;
          if (statusText === 'OK') {
            ElNotification({
              title: '成功',
              message: '该信息删除成功',
              type: 'success',
            });
            return this.getData();
          }
        })
        .catch(() => {
          console.log('取消');
        });
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
