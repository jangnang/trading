import $api from '../index';

interface BulkData {
  name: string;
  browser: string;
  coin: string;
  chain: string;
}

// 修改
const editEvent = async (id: string | number, data: BulkData) => {
  const res = await $api.put(`/bulk/${id}`, {
    ...data,
  });
  return res;
};

// 删除
const delEvent = async (id: string | number) => {
  const res = await $api.delete(`/bulk/${id}`);
  return res;
};

// 获取列表
const getEventList = async ({ $limit = 10, $page = 1 }) => {
  const $skip = ($page - 1) * $limit;

  const res = await $api.get(`/bulk?$limit=${$limit}&$skip=${$skip}`);
  return res;
};

export default {
  editEvent,
  delEvent,
  getEventList,
};
