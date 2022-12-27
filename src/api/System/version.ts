import $api from '../index';

interface VersionData {
  terrace: string;
  current: string;
}

// 修改
const editEvent = async (id: string | number, data: VersionData) => {
  const res = await $api.patch(`/version/${id}`, {
    ...data,
  });
  return res;
};

// 获取列表
const getEventList = async ({ $limit = 10, $page = 1 }) => {
  const $skip = ($page - 1) * $limit;

  const res = await $api.get(`/version?$limit=${$limit}&$skip=${$skip}`);
  return res;
};

export default {
  editEvent,
  getEventList,
};
