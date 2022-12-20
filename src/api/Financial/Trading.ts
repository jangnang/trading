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
  createdAt1,
}: any) => {
  const $skip = ($page - 1) * $limit;
  let queryStr = '';
  if (keyword) queryStr += `&members=${keyword}`;
  if (trading) queryStr += `&trading=${trading}`;
  if (amount) queryStr += `&amount[$and][$gt]=${amount}&amount[$and][$lt]=${amount1}`;
  if (service) queryStr += `&service[$and][$gt]=${service}&service[$and][$lt]=${service1}`;
  // if (createdAt) queryStr += `&time[$and][$gt]=${createdAt}&time[$and][$lt]=${createdAt1}`;

  const res = await $api.get(`/details?$limit=${$limit}&$skip=${$skip}${queryStr}`);
  return res;
};
