<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-breadcrumb separator="/" class="sds">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/${d}` }">{{ c }}</el-breadcrumb-item>
        </el-breadcrumb></el-header
      >
      <el-container>
        <el-aside width="wid">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="true" :style="{ display: ce, left: 120 + 'px' }" @click="fn1"
              ><el-icon size="25px"><Fold /></el-icon>
            </el-radio-button>
            <el-radio-button :label="false" :style="{ display: cl }" @click="fn"
              ><el-icon size="25px"><Expand /></el-icon
            ></el-radio-button>
          </el-radio-group>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @select="attribute"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><UserFilled /></el-icon>
                <span>会员管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="management" path="会员管理">会员管理</el-menu-item>
                <el-menu-item index="real-name">实名管理</el-menu-item>
                <el-menu-item index="balance">余额管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Share /></el-icon>
                <span>邀请管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="Record">邀请记录</el-menu-item>
                <el-menu-item index="Ranking">邀请排名</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Tools /></el-icon>
                <span>CTC管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="Order">订单列表</el-menu-item>
                <el-menu-item index="Rxchang">承兑商列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Tools /></el-icon>
                <span>内容管理管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="Advertising">广告管理</el-menu-item>
                <el-menu-item index="Help">帮助管理</el-menu-item>
                <el-menu-item index="Announcement">公告管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon><WalletFilled /></el-icon>
                <span>财务管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="Trading">交易明细</el-menu-item>
                <el-menu-item index="Mention">提币审核</el-menu-item>
                <el-menu-item index="Charge">手续费管理</el-menu-item>
                <el-menu-item index="Service">充币记录</el-menu-item>
                <el-menu-item index="Fiat">法币交易明细</el-menu-item>
                <el-menu-item index="Detail">提币明细</el-menu-item>
                <el-menu-item index="Financial">财务统计</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="6">
              <template #title>
                <el-icon><Tools /></el-icon>
                <span>币币管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="Orderss">订单管理</el-menu-item>
                <el-menu-item index="Setup">币币设置</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="7">
              <template #title>
                <el-icon><Tools /></el-icon>
                <span>活动管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="Activity">活动管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="8">
              <template #title>
                <el-icon><WalletFilled /></el-icon>
                <span>红包管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="Envelope">红包列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="9" @click="fn2">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span>系统管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="Maintenance">系统维护</el-menu-item>
                <el-menu-item index="Version">版本管理</el-menu-item>
                <el-menu-item index="Pact">币种扩展管理</el-menu-item>
                <el-menu-item index="Deploy">归集配置列表</el-menu-item>
                <el-menu-item index="Bulk">币种协议管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="10">
              <template #title>
                <el-icon><WalletFilled /></el-icon>
                <span>保证金管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="Ensure">查询保证金策略</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="11">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span> OTC管理</span>
              </template>
              <el-menu-item-group @click="fn2">
                <el-menu-item index="Advertisings">后台广告</el-menu-item>
                <el-menu-item index="Complaint">后台申述</el-menu-item>
                <el-menu-item index="Orders">订单管理</el-menu-item>
                <el-menu-item index="Currency">币种管理</el-menu-item>
                <el-menu-item index="Surrender">退保管理</el-menu-item>
                <el-menu-item index="Certification">认证商家</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main> <router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  data() {
    return {
      c: '',
      d: '',
      isCollapse: true,
      wid: '200px',
      ce: 'none',
      cl: 'block',
    };
  },
  methods: {
    attribute(index: any, indexPath: any) {
      this.$router.push(index);
      this.d = index;
      console.log(index, indexPath);
    },
    fn() {
      console.log(111);
      this.cl = 'none';
      this.ce = 'block';
    },
    fn1() {
      console.log(111);
      this.cl = 'block';
      this.ce = 'none';
    },
    fn2(index: any) {
      // const daat2 = data1.innerText;
      this.c = index.srcElement.innerText;
      console.log(index.srcElement.innerText);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-header {
  width: 100vw;
  background: lightblue;
}
.el-aside {
  height: 100vh;
  background: burlywood;
}
.el-col-12 {
  max-width: 0%;
  flex: 0 0 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  background-color: burlywood;
  width: 190px;
}
.el-sub-menu {
  background-color: burlywood;
}
.el-menu-item {
  background-color: rgb(184, 162, 132);
}
::v-deep .el-menu-item-group__title {
  background-color: rgb(184, 162, 132);
}
::v-deep .el-radio-button__inner {
  background: linear-gradient(to right, rgb(189, 195, 199), rgb(44, 62, 80));
  border-radius: 20%;
}
.el-radio-group {
  width: 20px;
  position: absolute;
  top: 9px;
  left: 71px;
}
::v-deep .el-breadcrumb {
  display: inline-block;
  cursor: pointer;
  position: absolute;
  top: 25px;
  left: 270px;
  cursor: pointer;
}
.el-breadcrumb__inner {
  cursor: pointer;
}
</style>
