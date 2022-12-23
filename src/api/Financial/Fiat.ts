import dayjs from 'dayjs';
import $api from '../index';
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
