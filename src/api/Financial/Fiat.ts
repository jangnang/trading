import dayjs from 'dayjs';
import $api from '../index';
// 列表
// eslint-disable-next-line import/prefer-default-export
export const TradingList = async ({
  keyword,
  trading,
  founder,
  currency,
  $limit = 10,
  $page = 1,
}: any) => {
  const $skip = ($page - 1) * $limit;
  let queryStr = '';
  if (keyword) queryStr += `&dealer=${keyword}`;
  if (trading) queryStr += `&type=${trading}`;
  if (founder) queryStr += `&founder=${founder}`;
  if (currency) queryStr += `&currency=${currency}`;
  const res = await $api.get(`/currency?$limit=${$limit}&$skip=${$skip}${queryStr}`);
  return res;
};
// 新增
export const addKfc = async (data: any) => {
  const res = await $api.post(
    '/currency', // 请求地址
    {
      // 发送的数据
      ...data,
    },
  );

  return res;
};
// 删除
export const delEvent = async (id: string | number) => {
  const res = await $api.delete(`/currency/${id}`);
  return res;
};
// 修改
export const editEvent = async (id: string | number, data: any) => {
  const res = await $api.patch(`/currency/${id}`, {
    ...data,
  });
  return res;
};
