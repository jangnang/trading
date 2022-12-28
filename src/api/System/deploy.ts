import $api from '../index';

interface DeployData {
  currency: string;
  deal: string;
  number: number;
  site: string;
}

// 添加
const addEvent = async (data: DeployData) => {
  const res = await $api.post('/deploy', {
    ...data,
  });

  return res;
};

// 修改
const editEvent = async (id: string | number, data: DeployData) => {
  const res = await $api.put(`/deploy/${id}`, {
    ...data,
  });
  console.log(data);
  return res;
};

// 删除
const delEvent = async (id: string | number) => {
  const res = await $api.delete(`/deploy/${id}`);
  return res;
};

// 获取列表
const getEventList = async ({ $limit = 10, $page = 1 }) => {
  const $skip = ($page - 1) * $limit;

  const res = await $api.get(`/deploy?$limit=${$limit}&$skip=${$skip}`);
  return res;
};

export default {
  addEvent,
  editEvent,
  delEvent,
  getEventList,
};
