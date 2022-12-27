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
      <p style="margin-left: 20px">
        <span>法币交易总交易量</span><br />
        <span class="otc-jy">{{ volume }}</span
        ><br />
        <span>总交易额 100</span><br />
        <span>总手续费 0</span>
      </p>
      <el-select v-model="value" filterable size="small" style="width: 100px" placeholder="USDT">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @click="fn"
        />
      </el-select>
      <div class="otc-volume">
        <div class="ct1"><span>昨日交易量</span><br /><span>0</span></div>
        <div class="ct2"><span>昨日手续费</span><br /><span>0</span></div>
      </div>
    </div>
    <div class="cb">
      <div class="otc">币币交易</div>
      <p style="margin-left: 20px">
        <span>法币交易总交易量</span><br />
        <span class="otc-jy">{{ volume1 }}</span
        ><br />
        <span
          >总手续费 <i style="color: brown">{{ void1 }}</i></span
        >
      </p>
      <el-select v-model="value" filterable size="small" style="width: 100px" placeholder="USDT">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @click="transactions"
        />
      </el-select>
      <div class="otc-volume">
        <div class="ct1">
          <span>昨日交易量</span><br /><span>{{ transaction }}</span>
        </div>
        <div class="ct2"><span>昨日手续费</span><br /><span>0</span></div>
      </div>
    </div>
    <br />
    <br />
    <div><The /></div>
    <br />
    <div><currency /></div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import * as echarts from 'echarts';
import The from '@/components/The.vue';
import currency from '@/components/currency.vue';

export default defineComponent({
  data() {
    return {
      volume: '3.15',
      value: '',
      volume1: '0',
      void1: '1801.77665484653',
      transaction: '0',
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
      options: [
        {
          value: 'USDT',
          label: 'USDT',
        },
        {
          value: 'BTC',
          label: 'BTC',
        },
      ],
      options1: [
        {
          value: 'USDT',
          label: 'USDT',
        },
        {
          value: 'BTC',
          label: 'BTC',
        },
        {
          value: 'ETH',
          label: 'ETH',
        },
      ],
    };
  },
  components: {
    The,
    currency,
  },
  methods: {
    fn() {
      if (this.value === 'BTC') {
        this.volume = '15';
      } else {
        this.volume = '3.15';
      }

      console.log(this.value);
    },
    transactions() {
      if (this.value === 'BTC') {
        this.volume1 = '100000';
        this.void1 = '180';
        this.transaction = '455547';
      } else if (this.value === 'ETH') {
        this.volume1 = '10000';
        this.void1 = '180';
        this.transaction = '45557';
      } else {
        this.volume1 = '0';
        this.void1 = '1801.77665484653';
        this.transaction = '0';
      }

      console.log(111);
    },
  },
});
</script>
<style lang="scss" scoped>
.box {
  width: 100vw;

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
  position: relative;
  margin-top: 10px;
  width: 25vw;
  height: 250px;
  margin-left: 20px;
  background: #ffff;
  color: #80848f;
  float: left;
}
.cb .otc {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-bottom: rgb(234, 228, 228) 1px solid;
  color: #80848f;
}
.el-select {
  position: absolute;
  top: 55px;
  right: 35px;
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

.el-table {
  --el-table-border-color: var(--el-border-color-lighter);
  --el-table-border: 0px solid var(--el-table-border-color);
}
</style>
