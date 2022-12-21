import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
// 创建实例
const $api = axios.create({
  baseURL: 'http://localhost:3030',
});

// 拦截请求
$api.interceptors.request.use((config) => {
  // 添加token
  if (localStorage.getItem('token')) {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});
// 添加拦截
$api.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    return response;
  },
  (error) => {
    // 拦截错误
    const { status } = error.response;
    ElMessage.error(`接口请求错误 状态码${status}`);
    if (status === 401) {
      window.location.href = '/#/login';
    }
  },
);
export default $api;
