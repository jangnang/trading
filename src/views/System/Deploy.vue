<template>
  <Content title="归集配置管理">
    <el-button type="primary" class="break" @click="handleRenovate()">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />

    <el-button type="primary" class="add" @click="dialogFormVisible = true">
      添加归集配置
    </el-button>
    <el-dialog v-model="dialogFormVisible" title="添加协议" width="70%">
      <el-form :model="form">
        <el-form-item label="币种名称" :label-width="formLabelWidth">
          <el-input v-model="form.currency" autocomplete="off" />
        </el-form-item>
        <el-form-item label="协议名称" :label-width="formLabelWidth">
          <el-input v-model="form.deal" autocomplete="off" />
        </el-form-item>
        <el-form-item label="最低归集数量：" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="归集地址" :label-width="formLabelWidth">
          <el-input v-model="form.site" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改 -->
    <el-drawer v-model="showEdit" title="修改归集配置管理信息">
      <el-form :model="form">
        <el-form-item label="币种名称" :label-width="LabelWidth">
          <el-input v-model="form.currency" autocomplete="off" />
        </el-form-item>
        <el-form-item label="协议名称" :label-width="LabelWidth">
          <el-input v-model="form.deal" autocomplete="off" />
        </el-form-item>
        <el-form-item label="最低归集数量：" :label-width="LabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="归集地址" :label-width="LabelWidth">
          <el-input v-model="form.site" autocomplete="off" />
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
      <el-table-column align="center" prop="currency" label="币种名称" width="100" />
      <el-table-column align="center" prop="deal" label="协议名称" />
      <el-table-column align="center" prop="number" label="最低归集数量：" />
      <el-table-column align="center" prop="site" label="归集地址" />
      <el-table-column align="center" fixed="right" label="操作">
        <template #default="{ row }">
          <el-button type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
          <el-button type="primary" size="small" @click="handleEditOpen(row)">修改</el-button>
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
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import axios from 'axios';
import DeployApi from '@/api/System/deploy';

export default defineComponent({
  name: 'deployPage',
  data() {
    return {
      page: 1,
      total: 0,
      limit: 10,
      form: {
        currency: '',
        deal: '',
        number: '',
        site: '',
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      LabelWidth: '50px',
      dialog: false,
      id: 1,
      formId: '',
      showEdit: false,
      tableData: [
        {
          currency: '',
          deal: '',
          number: '',
          site: '',
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
      const res = await DeployApi.getEventList({ $limit: this.limit, $page: this.page });
      console.log('res', res);
      const { status, data } = res;
      if (status === 200) {
        this.tableData = data.data;
        console.log(this.tableData);
        this.total = data.total;
      }
    },

    // 修改
    handleEditOpen(row) {
      console.log('要修改的内容', row);
      const {
        id, currency, deal, number, site, ...info
      } = row;
      this.formId = id;
      this.form = {
        ...info,
        currency,
        deal,
        number,
        site: site.split(','),
      };
      this.showEdit = true;
    },
    // 修改数据
    // eslint-disable-next-line consistent-return
    async confirmEdit() {
      const res = await DeployApi.editEvent(this.formId, {
        ...this.form,
        currency: this.form.currency,
        deal: this.form.deal,
        number: this.form.number,
        site: this.form.site.join(),
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

    // 添加数据
    async confirm() {
      console.log('添加', this.form);
      const {
        currency, deal, number, site,
      } = this.form;

      const res = await DeployApi.addEvent({
        currency,
        deal,
        number,
        site,
      });
      console.log('res', res);

      const { statusText, data } = res;
      // 添加成功提示
      if (statusText === 'Created') {
        ElMessage({
          message: '添加成功',
          type: 'success',
        });

        // 关闭
        this.dialogFormVisible = false;

        // 清空表单
        this.form = {
          currency,
          deal,
          number,
          site,
        };

        // 重新获取页面数据
        this.getData();
      }
    },
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
          const res = await DeployApi.delEvent(id);
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
