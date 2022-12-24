<template>
  <div class="management">
    <div class="currency">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="法币交易" name="first">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="币种" align="center" style="width: 33.33%" />
            <el-table-column prop="name" label="成交量" align="center" style="width: 33.33%" />
            <el-table-column
              prop="address"
              label="交易额"
              align="center"
              style="width: 33.33%"
            /> </el-table
        ></el-tab-pane>
        <el-tab-pane label="币币交易" name="second">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="币种" align="center" style="width: 33.33%" />
            <el-table-column prop="name" label="成交量" align="center" style="width: 33.33%" />
            <el-table-column
              prop="address"
              label="交易额"
              align="center"
              style="width: 33.33%"
            /> </el-table
        ></el-tab-pane>
      </el-tabs>
      <el-link :underline="false" @click="fn">明细</el-link>
    </div>
    <div class="Bibi">
      <div class="head">
        <el-tabs v-model="activeName1" class="demo-tabs">
          <el-tab-pane label="法币交易" name="first1">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="币种" align="center" style="width: 50%" />
              <el-table-column
                prop="name"
                label="手续费"
                align="center"
                style="width: 50%"
              /> </el-table
          ></el-tab-pane>
          <el-tab-pane label="币币交易" name="second">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="币种" align="center" style="width: 50%" />
              <el-table-column
                prop="name"
                label="手续费"
                align="center"
                style="width: 50%"
              /> </el-table
          ></el-tab-pane>
          <el-tab-pane label="提币" name="third">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="币种" align="center" style="width: 50%" />
              <el-table-column
                prop="name"
                label="手续费"
                align="center"
                style="width: 50%"
              /> </el-table
          ></el-tab-pane>
        </el-tabs>
        <el-link :underline="false" @click="fn1">明细</el-link>
      </div>
    </div>
    <div class="filling">
      <div class="head">
        <el-tabs v-model="activeName2" class="demo-tabs">
          <el-tab-pane label="充币" name="first2">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="币种" align="center" style="width: 50%" />
              <el-table-column prop="name" label="充币总数" align="center" style="width: 50%" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="提币" name="second">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="币种" align="center" style="width: 50%" />
              <el-table-column
                prop="name"
                label="提币总数"
                align="center"
                style="width: 50%"
              /> </el-table
          ></el-tab-pane>
        </el-tabs>
        <el-link :underline="false" @click="fn2">明细</el-link>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      activeName: 'first',
      activeName1: 'first1',
      activeName2: 'first2',
    };
  },
  methods: {
    fn() {
      this.$router.push({
        name: 'Fiat',
      });
    },
    fn1() {
      this.$router.push({
        name: 'Fiat',
      });
    },
    fn2() {
      this.$router.push({
        name: 'Fiat',
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.management {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: gainsboro;
}
.currency {
  width: 40vw;
  height: 35vh;
  margin-left: 2vw;
  margin-top: 3vh;
  background: rgb(255, 255, 255);
  position: relative;
}
.Bibi {
  width: 40vw;
  height: 35vh;
  background: rgb(255, 255, 255);
  margin-left: 6vw;
  margin-top: 3vh;
  position: relative;
}
.filling {
  margin-left: 2vw;
  width: 40vw;
  height: 35vh;
  background: rgb(255, 255, 255);
  position: relative;
}
::v-deep .el-tabs__nav {
  margin-left: 25px;
}
::v-deep .el-tabs__nav .el-tabs__active-bar {
  margin-left: 25px;
}
::v-deep .el-link__inner {
  position: absolute;
  top: -155px;
  right: -500px;
}
</style>
