<template>
  <Content title="系统信息维护">
    <el-button type="primary" class="break" @click="handleRenovate()">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />

    <!-- 查找 -->
    <el-input v-model="input" placeholder="请输入键查找" />
    <el-button @click="onSearch">搜索</el-button>
    <!-- 新增 -->
    <el-button type="primary" class="add" @click="dialogFormVisible = true">新增</el-button>

    <!-- 添加 -->
    <el-dialog v-model="dialogFormVisible" title="新增系统信息维护信息">
      <el-form :model="form">
        <el-form-item label="键" :label-width="formLabelWidth">
          <el-input v-model="form.key" autocomplete="off" />
        </el-form-item>
        <el-form-item label="值" :label-width="formLabelWidth">
          <el-input v-model="form.value" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" />
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
    <el-drawer v-model="showEdit" title="修改系统信息维护信息">
      <el-form :model="form">
        <el-form-item label="键" :label-width="LabelWidth">
          <el-input v-model="form.key" autocomplete="off" />
        </el-form-item>
        <el-form-item label="值" :label-width="LabelWidth">
          <el-input v-model="form.value" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="LabelWidth">
          <el-input v-model="form.address" autocomplete="off" />
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
      <el-table-column align="center" prop="key" label="键" />
      <el-table-column align="center" prop="value" label="值" />
      <el-table-column align="center" prop="address" label="备注" />
      <el-table-column align="center" prop="createdAt" label="创建时间" />
      <el-table-column align="center" prop="updatedAt" label="更新时间" />
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
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import axios from 'axios';
import dayjs from 'dayjs';
import MianApi from '@/api/System/mian';
import { showMsg } from '@/util/toast';

export default defineComponent({
  name: 'maintenancePage',
  data() {
    return {
      page: 1,
      total: 0,
      limit: 10,
      form: {
        key: '',
        value: '',
        address: '',
      },
      dialogFormVisible: false,
      formLabelWidth: '200px',
      LabelWidth: '50px',
      dialog: false,
      id: 1,
      formId: '',
      showEdit: false,
      input: '',
      tableData: [
        {
          id: '',
          key: '',
          value: '',
          address: '',
          createdAt: '',
          updatedAt: '',
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
    input(nv) {
      console.log('搜索发生变化', nv);
      this.page = 1;
      // this.getData();
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
    onSearch() {
      this.page = 1;
      this.getData();
    },
    handleSizeChange(res) {
      this.limit = res;
      this.getData();
    },
    // 修改
    handleEditOpen(row) {
      console.log('要修改的内容', row);
      const {
        id, key, value, address, ...info
      } = row;
      console.log('address', address);
      this.formId = id;
      this.form = {
        ...info,
        key,
        value,
        address: address.split(','),
      };
      this.showEdit = true;
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
          const res = await MianApi.delMian(id);
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
          showMsg('删除失败');
        })
        .catch(() => {
          console.log('取消');
        });
    },
    // 获取列表
    async getData() {
      const res = await MianApi.getMianList({
        keyword: this.input,
        $limit: this.limit,
        $page: this.page,
      });
      console.log('res', res);
      const { status, data } = res;
      if (status === 200) {
        this.tableData = data.data;
        // console.log(this.tableData);
        this.total = data.total;
        for (const index of this.tableData) {
          const s = dayjs(index.createdAt).format('YYYY-MM-DD HH:mm:ss');
          index.createdAt = s;
        }
        for (const index of this.tableData) {
          const h = dayjs(index.updatedAt).format('YYYY-MM-DD HH:mm:ss');
          index.updatedAt = h;
        }
      }
    },
    // 添加数据
    async confirm() {
      console.log('添加', this.form);
      const { key, value, address } = this.form;

      const res = await MianApi.addMian({
        key,
        value,
        address,
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
          key: '',
          value: '',
          address: '',
        };

        // 重新获取页面数据
        this.getData();
      }
    },
    // 修改数据
    // eslint-disable-next-line consistent-return
    async confirmEdit() {
      const res = await MianApi.editMian(this.formId, {
        ...this.form,
        key: this.form.key,
        value: this.form.value,
        address: this.form.address.join(),
      });
      console.log('status', res);
      const { status } = res;
      if (status !== 200) return showMsg('修改失败');
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

  right: 20px;
}
.add {
  float: right;
  margin-bottom: 20px;
  margin-left: 5px;
}

.alter {
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

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
