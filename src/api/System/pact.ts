import $api from '../index';

interface PactData {
  extend: string;
  name: string;
  site: string;
  precision: string;
  state: string;
  deposit: string;
  recharge: string;
  affirm: string;
}

// 添加
const addEvent = async (data: PactData) => {
  const res = await $api.post('/pact', {
    ...data,
  });

  return res;
};

// 修改
const editEvent = async (id: string | number, data: PactData) => {
  const res = await $api.put(`/pact/${id}`, {
    ...data,
  });
  return res;
};

// 删除
const delEvent = async (id: string | number) => {
  const res = await $api.delete(`/pact/${id}`);
  return res;
};

// 获取列表
const getEventList = async ({ $limit = 10, $page = 1 }) => {
  const $skip = ($page - 1) * $limit;

  const res = await $api.get(`/pact?$limit=${$limit}&$skip=${$skip}`);
  return res;
};

export default {
  addEvent,
  editEvent,
  delEvent,
  getEventList,
};
