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
          <el-select v-model="form.id" placeholder="请选择">
            <el-option label="NEO" />
            <el-option label="BNB" />
            <el-option label="TRX" />
            <el-option label="Ethereum" />
            <el-option label="Bitcoin" />
            <el-option label="USDT" />
            <el-option label="Litecoin" />
            <el-option label="BitcoinCash" />
            <el-option label="BitcoinSV" />
            <el-option label="Ripple" />
            <el-option label="BZB" />
            <el-option label="HT" />
            <el-option label="UNI" />
            <el-option label="YFII" />
            <el-option label="YFI" />
            <el-option label="DOGE" />
            <el-option label="DASH" />
            <el-option label="NEO" />
          </el-select>
        </el-form-item>
        <el-form-item label="币种协议：" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="请选择">
            <el-option label="Bitcoin" />
            <el-option label="BSC Binance Smart Chain (BEP20)" />
            <el-option label="TRX Tron (TRC20)" />
            <el-option label="ETH Ethereum (ERC20)" />
          </el-select>
        </el-form-item>
        <el-form-item label="合约地址：" :label-width="formLabelWidth">
          <el-input v-model="form.site" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="币种精度：" :label-width="formLabelWidth">
          <el-input v-model="form.precision" value="6" autocomplete="off" />
        </el-form-item>
        <p>充值设置</p>
        <el-form-item label="是否可充值：" style="margin-left: 55px">
          <el-radio-group v-model="form.recharge">
            <el-radio label="1" size="small">启用</el-radio>
            <el-radio label="2" size="small">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最低充值金额：" :label-width="formLabelWidth">
          <el-input v-model="form.name" value="0" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="充值确认数：" :label-width="formLabelWidth">
          <el-input v-model="form.name" value="3" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <p>提现设置</p>
        <el-form-item label="是否可提现：" style="margin-left: 55px">
          <el-radio-group v-model="form.deposit">
            <el-radio label="1" size="small">启用</el-radio>
            <el-radio label="2" size="small">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提现费率：" :label-width="formLabelWidth">
          <el-input v-model="form.name" value="0" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="最低手续费：" :label-width="formLabelWidth">
          <el-input v-model="form.name" value="0" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="最小提现数量：" :label-width="formLabelWidth">
          <el-input v-model="form.name" value="0" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="最大提现数量：" :label-width="formLabelWidth">
          <el-input v-model="form.name" value="0" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注码充值的地址：" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入" autocomplete="off" />
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
      <el-table-column align="center" prop="id" label="币种名称" width="100" />
      <el-table-column align="center" prop="name" label="协议名称" />
      <el-table-column align="center" prop="site" label="合约地址" />
      <el-table-column align="center" prop="precision" label="币种精度" />
      <el-table-column align="center" prop="state" label="状态" />
      <el-table-column align="center" prop="deposit" label="提现状态" />
      <el-table-column align="center" prop="recharge" label="充值状态" />
      <el-table-column align="center" prop="affirm" label="确认数" />
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
import { ElMessage } from 'element-plus';
import axios from 'axios';
import PactApi from '@/api/pact';

export default defineComponent({
  name: 'pactPage',
  data() {
    return {
      form: {
        id: '',
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
          id: 'NEO',
          name: 'Bitcoin',
          site: '1',
          precision: '6',
          state: '',
          deposit: '',
          recharge: '',
          affirm: '3',
        },
      ],
    };
  },
  methods: {
    handleRenovate() {
      window.location.reload();
      console.log('click');
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
