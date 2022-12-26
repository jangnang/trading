<template>
  <div class="cs">
    <el-table :data="tableData" height="250" style="width: 100%">
      <el-table-column prop="date" label="用户类型" width="180" />
      <el-table-column prop="name" label="累计" width="180" />
      <el-table-column prop="address" label="昨天新增" />
    </el-table>
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
.cs {
  width: 30vw;
}
</style>
