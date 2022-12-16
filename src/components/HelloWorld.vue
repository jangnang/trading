<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col>
              <el-menu default-active="2" class="el-menu-vertical-demo" @select="attribute">
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>会员管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="management">会员管理</el-menu-item>
                    <el-menu-item index="real-name">实名管理</el-menu-item>
                    <el-menu-item index="balance">余额管理</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>邀请管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="Record">邀请记录</el-menu-item>
                    <el-menu-item index="Ranking">邀请排名</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>OTC管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="Order">订单列表</el-menu-item>
                    <el-menu-item index="Rxchang">承兑商列表</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="4">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>内容管理管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="Advertising">广告管理</el-menu-item>
                    <el-menu-item index="Help">帮助管理</el-menu-item>
                    <el-menu-item index="Announcement">公告管理</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="5">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>财务管理</span>
                  </template>
                  <el-menu-item-group>
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
                    <el-icon><location /></el-icon>
                    <span>币币管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="Order">订单管理</el-menu-item>
                    <el-menu-item index="Setup">币币设置</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="7">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>活动管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="Activity">活动管理</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="8">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>红包管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="Activity">红包列表</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="9">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>系统管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="Role">角色管理</el-menu-item>
                    <el-menu-item index="User">用户管理</el-menu-item>
                    <el-menu-item index="Repartment">部门管理</el-menu-item>
                    <el-menu-item index="System">系统日志</el-menu-item>
                    <el-menu-item index="Management">币种管理</el-menu-item>
                    <el-menu-item index="Permissions">权限管理</el-menu-item>
                    <el-menu-item index="Maintenance">系统信息维护</el-menu-item>
                    <el-menu-item index="Version">版本管理</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="10">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>保证金管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="Ensure">查询保证金策略</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="11">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span> OTC管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="Advertising">后台广告</el-menu-item>
                    <el-menu-item index="Complaint">后台申述</el-menu-item>
                    <el-menu-item index="Order">订单管理</el-menu-item>
                    <el-menu-item index="Currency">币种管理</el-menu-item>
                    <el-menu-item index="Surrender">退保管理</el-menu-item>
                    <el-menu-item index="Certification">认证商家</el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
              </el-menu>
            </el-col>
          </el-row></el-aside
        >
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  methods: {
    attribute(index: any) {
      this.$router.push(index);
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
  background: lemonchiffon;
}
.el-col-12 {
  max-width: 0%;
  flex: 0 0 100%;
}
</style>
