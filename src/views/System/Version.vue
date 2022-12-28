<template>
  <Content title="版本管理">
    <el-button type="primary" class="break" @click="handleRenovate()">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />

    <!-- 新增 -->
    <el-button type="primary" class="add" @click="dialogFormVisible = true">新增</el-button>

    <!-- 添加 -->
    <el-dialog v-model="dialogFormVisible" title="新增版本管理信息">
      <el-form :model="form">
        <el-form-item label="平台" :label-width="formLabelWidth">
          <el-input v-model="form.terrace" autocomplete="off" />
        </el-form-item>
        <el-form-item label="当前版本" :label-width="formLabelWidth">
          <el-input v-model="form.current" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-drawer v-model="showEdit" title="修改版本管理信息">
      <el-form :model="form">
        <el-form-item label="平台" :label-width="LabelWidth">
          <el-input v-model="form.terrace" autocomplete="off" />
        </el-form-item>
        <el-form-item label="当前版本" :label-width="LabelWidth">
          <el-input v-model="form.current" autocomplete="off" />
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
      <el-table-column align="center" prop="id" label="ID" width="100" />
      <el-table-column align="center" prop="terrace" label="平台" />
      <el-table-column align="center" prop="current" label="当前版本" />
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
import axios from 'axios';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import VersionApi from '@/api/System/version';

export default defineComponent({
  name: 'versionPage',
  data() {
    return {
      page: 1,
      total: 0,
      limit: 10,
      form: {
        terrace: '',
        current: '',
      },
      dialogFormVisible: false,
      formLabelWidth: '200px',
      id: 1,
      formId: '',
      dialog: false,
      showEdit: false,
      LabelWidth: '50px',
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
    },
    handlePageChange(res) {
      this.page = res;
      this.getData();
    },
    handleSizeChange(res) {
      this.limit = res;
      this.getData();
    },
    handleEditOpen(row) {
      console.log('要修改的内容', row);
      const { id, terrace, current } = row;
      this.formId = id;
      this.form = {
        terrace,
        current: current.split(','),
      };
      this.showEdit = true;
    },
    // 获取列表
    async getData() {
      const res = await VersionApi.getVersionList({ $limit: this.limit, $page: this.page });
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
      const { terrace, current } = this.form;
      const res = await VersionApi.addVersion({
        terrace,
        current,
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
          terrace: '',
          current: '',
        };
        // 重新获取页面数据
        this.getData();
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
          const res = await VersionApi.delVersion(id);
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
    // 修改数据
    // eslint-disable-next-line consistent-return
    async confirmEdit() {
      const res = await VersionApi.editVersion(this.formId, {
        ...this.form,
        terrace: this.form.terrace,
        current: this.form.current.join(),
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
