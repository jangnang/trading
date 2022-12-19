import $api from '../index';

// eslint-disable-next-line import/prefer-default-export
export const TradingList = async ({
  keyword,
  trading,
  timis1,
  createdAt,
  $limit = 10,
  $page = 1,
}: any) => {
  const $skip = ($page - 1) * $limit;
  let queryStr = '';
  if (keyword) queryStr += `&members=${keyword}`;
  if (trading) queryStr += `&trading=${trading}`;
  const res = await $api.get(`/details?$limit=${$limit}&$skip=${$skip}${queryStr}`);
  return res;
};
