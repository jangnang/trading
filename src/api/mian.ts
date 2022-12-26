import $api from '.';

interface EventParams {
  key: string;
  value: string;
  address: string;
}

// 添加
const addEvent = async (data: EventParams) => {
  const res = await $api.post('/mian', {
    ...data,
  });

  return res;
};

// 修改
const editEvent = async (id: string | number, data: EventParams) => {
  const res = await $api.patch(`/mian/${id}`, {
    ...data,
  });
  return res;
};

// 获取列表
const getEventList = async () => {
  //   const $skip = ($page - 1) * $limit;
  //   let queryStr = ''; $limit=${$limit}&$skip=${$skip}${queryStr}
  //   if (keyword) queryStr += `&name=${keyword}`;

  const res = await $api.get('/mian');
  return res;
};

export default {
  addEvent,
  editEvent,
  getEventList,
};
