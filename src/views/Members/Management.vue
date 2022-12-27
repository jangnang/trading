<template>
  <h1>会员管理</h1>
  <el-divider />
  <div class="mana">
    <el-input
      v-model="searchuid"
      size="large"
      class="w-50 m-2"
      placeholder="请输入用户名、邮箱、手机号、姓名搜索"
    />
    会员状态:
    <el-select v-model="value" placeholder="请选择">
      <el-option label="审核成功" value="shanghai" />
      <el-option label="审核失败" value="beijing" />
    </el-select>
    <el-button color="skyblue" class="sbtn">搜索</el-button>
  </div>
  <el-table :data="filterTableData" style="width: 100%" border>
    <el-table-column type="selection" width="100" />
    <el-table-column prop="num1" label="会员ID" width="150" />
    <el-table-column prop="uid" label="会员名称" width="150" />
    <el-table-column prop="uname" label="手机号码" width="150" />
    <el-table-column prop="urname" label="会员等级" width="150" />
    <el-table-column prop="idcard" label="真实姓名" width="100" />
    <el-table-column prop="idcard" label="邀请者id" width="100" />
    <el-table-column prop="restime" label="注册时间" width="300" />
    <el-table-column prop="idcard" label="交易状态" width="80" />
    <el-table-column prop="state" label="状态" width="80" />
    <el-table-column prop="state" label="会员邮箱" width="150" />
    <el-table-column prop="state" label="合伙类型" width="100" />
    <el-table-column fixed="right" label="操作" width="100">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"> 查看 </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const searchuid = ref('');

const searchidcard = ref('');

const router = useRouter();

interface User {
  num1: string;
  uid: string;
  uname: string;
  urname: string;
  idcard: string;
  restime: string;
  state: string;
}

const tableData: User[] = [
  {
    num1: '903',
    uid: 'Tom',
    urname: 'California',
    idcard: 'Los Angeles',
    uname: 'No. 189, Grove St, Los Angeles',
    restime: '2016-05-03',
    state: '审核成功',
  },
  {
    num1: '902',
    uid: 'KKK',
    urname: 'California',
    idcard: 'LZZ Angeles',
    uname: 'No. 189, Grove St, Los Angeles',
    restime: '2016-05-02',
    state: '审核成功',
  },
  {
    num1: '904',
    uid: 'YYY',
    urname: 'California',
    idcard: 'LKK Angeles',
    uname: 'No. 189, Grove St, Los Angeles',
    restime: '2016-05-04',
    state: '审核成功',
  },
  {
    num1: '901',
    uid: 'ZZZ',
    urname: 'California',
    idcard: 'LLL Angeles',
    uname: 'No. 189, Grove St, Los Angeles',
    restime: '2016-05-01',
    state: '审核成功',
  },
];

// 输入会员id搜索
const filterTableData = computed(() => tableData.filter(
  (data) => !searchuid.value || data.uid.toLowerCase().includes(searchuid.value.toLowerCase()),
));

// 输入身份证搜索
// const filterTableData = computed(() => tableData.filter(
//   (data) => !searchidcard.value
//       || data.idcard.toLowerCase().includes(searchidcard.value.toLowerCase()),
// ));

// 点击查看详细信息
const handleClick = () => {
  // router.push('auditdetail'),
};
</script>

<style scoped>
.w-50,
.m-2 {
  width: 40vh;
  margin-right: 5vh;
}
.mana {
  margin-bottom: 5vh;
}
.sbtn {
  margin-left: 1vh;
}
</style>
