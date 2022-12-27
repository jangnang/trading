import $api from '../index';

interface MaintenanceData {
  key: string;
  value: string;
  address: string;
}

// 添加
const addMian = async (data: MaintenanceData) => {
  const res = await $api.post('/mian', {
    ...data,
  });

  return res;
};

// 修改
const editMian = async (id: string | number, data: MaintenanceData) => {
  const res = await $api.put(`/mian/${id}`, {
    ...data,
  });
  console.log(data);
  return res;
};

// 删除
const delMian = async (id: string | number) => {
  const res = await $api.delete(`/mian/${id}`);
  return res;
};

// 查找
const getMian = async (id: string | number) => {
  const res = await $api.get(`/mian/${id}`);
  return res;
};

// 获取列表
const getMianList = async ({ $limit = 10, $page = 1, keyword }: any) => {
  const $skip = ($page - 1) * $limit;
  let queryStr = '';
  if (keyword) queryStr += `&key=${keyword}`;
  const res = await $api.get(`/mian?$limit=${$limit}&$skip=${$skip}${queryStr}`);
  return res;
};

export default {
  addMian,
  editMian,
  delMian,
  getMian,
  getMianList,
};
