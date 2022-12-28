import $api from '../index';

interface VersionData {
  terrace: string;
  current: string;
}

// 添加
const addVersion = async (data: any) => {
  const res = await $api.post('/version', {
    ...data,
  });

  return res;
};

// 删除
const delVersion = async (id: string | number) => {
  const res = await $api.delete(`/version/${id}`);
  return res;
};

// 修改
const editVersion = async (id: string | number, data: VersionData) => {
  const res = await $api.put(`/version/${id}`, {
    ...data,
  });
  console.log(data);
  return res;
};

// 获取列表
const getVersionList = async ({ $limit = 10, $page = 1 }) => {
  const $skip = ($page - 1) * $limit;

  const res = await $api.get(`/version?$limit=${$limit}&$skip=${$skip}`);
  return res;
};

export default {
  addVersion,
  editVersion,
  delVersion,
  getVersionList,
};
