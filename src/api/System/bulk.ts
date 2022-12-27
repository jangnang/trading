import $api from '../index';

interface BulkData {
  id: string | number;
  name: string;
  browser: string;
  coin: string;
  chain: string;
}

// 添加
const addEvent = async (data: BulkData) => {
  const res = await $api.post('/bulk', {
    ...data,
  });

  return res;
};

// 修改
const editEvent = async (id: string | number, data: BulkData) => {
  const res = await $api.patch(`/bulk/${id}`, {
    ...data,
  });
  return res;
};

// 获取列表
const getEventList = async ({ $limit = 10, $page = 1 }) => {
  const $skip = ($page - 1) * $limit;

  const res = await $api.get(`/bulk?$limit=${$limit}&$skip=${$skip}`);
  return res;
};

export default {
  addEvent,
  editEvent,
  getEventList,
};
