import dayjs from 'dayjs';
import $api from '../index';
// eslint-disable-next-line import/prefer-default-export
export const TradingList = async ({
  keyword, trading, amount, $limit = 10, $page = 1,
}: any) => {
  const $skip = ($page - 1) * $limit;
  let queryStr = '';
  if (keyword) queryStr += `&address=${keyword}`;
  if (trading) queryStr += `&money=${trading}`;
  if (amount) queryStr += `&agreement=${amount}`;
  const res = await $api.get(`/filling?$limit=${$limit}&$skip=${$skip}${queryStr}`);
  return res;
};
