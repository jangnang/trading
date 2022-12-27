<template>
  <Content title="币种扩展管理">
    <el-button type="primary" class="break" @click="handleRenovate()">
      <el-icon><RefreshRight /></el-icon>
      刷新
    </el-button>
    <el-divider />

    <el-button type="primary" class="add" @click="dialogFormVisible = true"> 添加扩展 </el-button>
    <el-dialog v-model="dialogFormVisible" title="新增" style="width: 80%">
      <el-divider />
      <p>币种基础信息</p>
      <el-form :model="form">
        <el-form-item label="是否启用：" style="margin-left: 65px">
          <el-radio-group v-model="form.state">
            <el-radio label="1" size="small">启用</el-radio>
            <el-radio label="2" size="small">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="币种名称：" :label-width="formLabelWidth">
          <el-input v-model="form.extend" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="币种协议：" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="合约地址：" :label-width="formLabelWidth">
          <el-input v-model="form.site" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="币种精度：" :label-width="formLabelWidth">
          <el-input v-model="form.precision" autocomplete="off" />
        </el-form-item>
        <p>充值设置</p>
        <el-form-item label="是否可充值：" style="margin-left: 55px">
          <el-radio-group v-model="form.recharge">
            <el-radio label="1" size="small">启用</el-radio>
            <el-radio label="2" size="small">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <p>提现设置</p>
        <el-form-item label="是否可提现：" style="margin-left: 55px">
          <el-radio-group v-model="form.deposit">
            <el-radio label="1" size="small">启用</el-radio>
            <el-radio label="2" size="small">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="确认数：" :label-width="formLabelWidth">
          <el-input v-model="form.affirm" placeholder="请输入" autocomplete="off" />
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
      <el-table-column align="center" prop="extend" label="币种名称" width="100" />
      <el-table-column align="center" prop="name" label="协议名称" />
      <el-table-column align="center" prop="site" label="合约地址" />
      <el-table-column align="center" prop="precision" label="币种精度" />
      <el-table-column align="center" label="状态">
        <template #default="scope">
          <template v-if="scope.row.state == 1">
            <el-button type="success" size="small">启用</el-button>
          </template>
          <template v-else-if="scope.row.state == 0">
            <el-button type="danger" size="small">禁用</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="deposit" label="提现状态">
        <template #default="scope">
          <template v-if="scope.row.deposit == 1">
            <el-button type="success" size="small">启用</el-button>
          </template>
          <template v-else-if="scope.row.deposit == 0">
            <el-button type="danger" size="small">禁用</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="recharge" label="充值状态">
        <template #default="scope">
          <template v-if="scope.row.recharge == 1">
            <el-button type="success" size="small">启用</el-button>
          </template>
          <template v-else-if="scope.row.recharge == 0">
            <el-button type="danger" size="small">禁用</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="affirm" label="确认数" />
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
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import PactApi from '@/api/System/pact';

export default defineComponent({
  name: 'pactPage',
  data() {
    return {
      page: 1,
      total: 0,
      limit: 10,
      form: {
        extend: '',
        name: '',
        site: '',
        precision: '',
        state: '',
        deposit: '',
        recharge: '',
        affirm: '',
      },
      dialogFormVisible: false,
      formLabelWidth: '150px',
      tableData: [
        {
          extend: '',
          name: '',
          site: '',
          precision: '',
          state: '',
          deposit: '',
          recharge: '',
          affirm: '',
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
      console.log('页面变化', res);
      this.page = res;
      this.getData();
    },
    handleSizeChange(res) {
      console.log('每页条数变化', res);
      this.limit = res;
      this.getData();
    },
    // 获取列表
    async getData() {
      const res = await PactApi.getEventList({
        $limit: this.limit,
        $page: this.page,
      });
      // console.log('res', res);
      const { status, data } = res;
      if (status === 200) {
        this.tableData = data.data;
        // console.log(this.tableData);
        this.total = data.total;
      }
    },
    // 添加数据
    async confirm() {
      console.log('添加', this.form);
      const {
        extend, name, site, precision, state, deposit, recharge, affirm,
      } = this.form;

      const res = await PactApi.addEvent({
        extend,
        name,
        site,
        precision,
        state,
        deposit,
        recharge,
        affirm,
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
          extend,
          name,
          site,
          precision,
          state,
          deposit,
          recharge,
          affirm,
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
  top: 95px;
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

::v-deep .el-dialog__body {
  padding-top: 0px;
}
</style>
