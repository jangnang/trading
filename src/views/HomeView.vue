<template>
  <div class="box">
    <div class="cs">
      <el-table :data="tableData" height="250" style="width: 100%" border>
        <el-table-column prop="date" label="用户类型" align="center" width="130" />
        <el-table-column prop="name" label="累计" align="center" width="130" />
        <el-table-column prop="address" label="昨天新增" align="center" />
      </el-table>
    </div>
    <div class="cb">
      <div class="otc">OTC交易</div>
      <p>
        <span>法币交易总交易量</span><br />
        <span class="otc-jy">3.15</span><br />
        <span>总交易额 100</span><br />
        <span>总手续费 0</span>
      </p>
      <div class="otc-volume">
        <div class="ct1"><span>昨日交易量</span><br /><span>0</span></div>
        <div class="ct2"><span>昨日手续费</span><br /><span>0</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      tableData: [
        {
          date: '注册用户',
          name: '55',
          address: '0',
        },
        {
          date: '实名用户',
          name: '9',
          address: '0',
        },
        {
          date: '认证商家',
          name: '2',
          address: '0',
        },
      ],
    };
  },
});
</script>
<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: silver;
}
.cs {
  display: inline-block;
  width: 25vw;
  height: 28vh;
  margin-left: 20px;
  margin-top: 10px;
  background: #ffff;
}
.cb {
  display: inline-block;
  margin-top: 10px;
  width: 30vw;
  height: 39vh;
  margin-left: 20px;
  background: #ffff;
  color: #80848f;
}
.cb .otc {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-bottom: rgb(234, 228, 228) 1px solid;
  color: #80848f;
}
.otc-jy {
  font: 26px/26px '';
  color: rgb(157, 51, 51);
}
.otc-volume {
  width: 80%;
  margin: auto;
  display: flex;
  border-top: rgb(234, 228, 228) 1px solid;
}
.ct1 {
  width: 50%;
  height: 80px;
  font: 16px/26px '';
  text-align: center;
}
.ct2 {
  width: 50%;
  height: 80px;
  font: 16px/26px '';
  text-align: center;
}
p {
  margin-left: 20px;
}
.el-table {
  --el-table-border-color: var(--el-border-color-lighter);
  --el-table-border: 0px solid var(--el-table-border-color);
}
</style>
