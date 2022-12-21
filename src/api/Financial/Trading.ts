import dayjs from 'dayjs';
import $api from '../index';
// eslint-disable-next-line import/prefer-default-export
export const TradingList = async ({
  keyword,
  trading,
  amount,
  amount1,
  $limit = 10,
  $page = 1,
  service,
  service1,
  createdAt,
}: any) => {
  const $skip = ($page - 1) * $limit;
  const timi = dayjs(createdAt[0]).format('YYYY-MM-DD HH:mm:ss');
  const timis = dayjs(createdAt[1]).format('YYYY-MM-DD HH:mm:ss');
  let queryStr = '';
  if (keyword) queryStr += `&members=${keyword}`;
  if (trading) queryStr += `&trading=${trading}`;
  if (amount) queryStr += `&amount[$and][$gt]=${amount}&amount[$and][$lt]=${amount1}`;
  if (service) queryStr += `&service[$and][$gt]=${service}&service[$and][$lt]=${service1}`;
  if (createdAt) queryStr += `&time[$and][$gt]=${timi}&time[$and][$lt]=${timis}`;

  const res = await $api.get(`/details?$limit=${$limit}&$skip=${$skip}${queryStr}`);
  return res;
};
