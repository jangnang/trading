<template>
  <div>
    <div>
      <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
        <el-form-item
          prop="email"
          label="用户名"
          :rules="[
            {
              required: true,
              message: '账号不能为空',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="dynamicValidateForm.email" />
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="domain.key"
          :label="'密码' + index"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.value" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">注册</el-button>

          <el-button @click="resetForm(formRef)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  domains: DomainItem[];
  email: string;
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
});

interface DomainItem {
  key: number;
  value: string;
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // eslint-disable-next-line consistent-return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
