import dayjs from 'dayjs';
import $api from '../index';
// eslint-disable-next-line import/prefer-default-export
export const TradingList = async ({
  keyword, // 邮箱
  trading, // 币种
  amount, // 手机号
  amount1, // 到账地址
  service, // 协议
  service1, // 状态
  createdAt, // 提交时间
  createdAt1, // 审核时间
  hash, // 哈希
  $limit = 10,
  $page = 1,
}: any) => {
  const $skip = ($page - 1) * $limit;
  const timi = dayjs(createdAt[0]).format('YYYY-MM-DD HH:mm:ss');
  const timis = dayjs(createdAt[1]).format('YYYY-MM-DD HH:mm:ss');
  const timi1 = dayjs(createdAt1[0]).format('YYYY-MM-DD HH:mm:ss');
  const timis1 = dayjs(createdAt1[1]).format('YYYY-MM-DD HH:mm:ss');
  let queryStr = '';
  if (keyword) queryStr += `&mailbox=${keyword}`;
  if (hash) queryStr += `&hash=${hash}`;
  if (service1) queryStr += `&state=${service1}`;
  if (amount) queryStr += `&mailbox=${amount}`;
  if (amount1) queryStr += `&address=${amount1}`;
  if (service) queryStr += `&agreement=${service}`;
  if (trading) queryStr += `&money=${trading}`;
  if (createdAt) queryStr += `&arrival[$and][$gt]=${timi}&arrival[$and][$lt]=${timis}`;
  if (createdAt1) queryStr += `&time[$and][$gt]=${timi}&time[$and][$lt]=${timis}`;
  const res = await $api.get(`/mention?$limit=${$limit}&$skip=${$skip}${queryStr}`);
  return res;
};
