import $api from '.';

interface EventParams {
  currency: string;
  deal: string;
  number: number;
  site: string;
}

// 添加
const addEvent = async (data: EventParams) => {
  const res = await $api.post('/deploy', {
    ...data,
  });

  return res;
};

// 修改
const editEvent = async (id: string | number, data: EventParams) => {
  const res = await $api.patch(`/deploy/${id}`, {
    ...data,
  });
  return res;
};

// 获取列表
const getEventList = async () => {
  //   const $skip = ($page - 1) * $limit;
  //   let queryStr = ''; $limit=${$limit}&$skip=${$skip}${queryStr}
  //   if (keyword) queryStr += `&name=${keyword}`;

  const res = await $api.get('/deploy');
  return res;
};

export default {
  addEvent,
  editEvent,
  getEventList,
};
