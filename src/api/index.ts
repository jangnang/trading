import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
// 创建一个axios实例
const $api = axios.create({
  baseURL: 'http://localhost:3030',
});

// 添加请求拦截器
$api.interceptors.request.use((config) => {
  // config 请求的所有的参数
  // 添加token
  if (localStorage.getItem('token')) {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

// 添加响应拦截器 统一处理响应的内容
$api.interceptors.response.use(
  (response) => {
    // 对结果进行干预
    const { status, data } = response;

    return response;
  },
  (error) => {
    console.log('if error', error);
    // 响应拦截最主要的功能就是去做异常的统一处理
    const { status } = error.response;
    console.log('status in interceptors', status);
    ElMessage(`接口请求有误 状态码${status}`);
    if (status === 401) {
      // token失效
      // 跳转到登录页
      window.location.href = '/#/login';
    }
  },
);

export default $api;
