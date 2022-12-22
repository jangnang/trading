import dayjs from 'dayjs';
import $api from '../index';
// eslint-disable-next-line import/prefer-default-export
export const TradingList = async ({
  keyword, trading, amount, $limit = 10, $page = 1,
}: any) => {
  const $skip = ($page - 1) * $limit;
  let queryStr = '';
  if (keyword) queryStr += `&nickname=${keyword}`;
  if (trading) queryStr += `&name=${trading}`;
  if (amount) queryStr += `&mobile=${amount}`;
  const res = await $api.get(`/draw?$limit=${$limit}&$skip=${$skip}${queryStr}`);
  return res;
};
