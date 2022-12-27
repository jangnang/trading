import { ElMessage } from 'element-plus';

// eslint-disable-next-line import/prefer-default-export
export const showMsg = (message: string) => {
  ElMessage({
    showClose: true,
    message,
    type: 'warning',
  });
};
