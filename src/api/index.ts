import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

const $api = axios.create({
  baseURL: 'http://localhost:3030',
});

$api.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => {
    const { status, data } = response;

    return response;
  },
  (error) => {
    console.log('if error', error);

    const { status } = error.response;
    console.log('status in interceptors', status);
    ElMessage(`接口请求有误 状态码${status}`);
    if (status === 401) {
      window.location.href = '/#/login';
    }
  },
);

export default $api;
