import $api from '.';

interface EventParams {
  terrace: string;
  current: string;
}

// 修改
const editEvent = async (id: string | number, data: EventParams) => {
  const res = await $api.patch(`/version/${id}`, {
    ...data,
  });
  return res;
};

// 获取列表
const getEventList = async () => {
  //   const $skip = ($page - 1) * $limit;
  //   let queryStr = ''; $limit=${$limit}&$skip=${$skip}${queryStr}
  //   if (keyword) queryStr += `&name=${keyword}`;

  const res = await $api.get('/version');
  return res;
};

export default {
  editEvent,
  getEventList,
};
