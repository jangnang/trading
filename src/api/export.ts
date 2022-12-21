import * as XLSX from 'xlsx'; // Vue3 版本
/*
    * @description:
    * @param {Object} json 服务端发过来的数据
    * @param {String} name 导出Excel文件名字

    * @param {String} titleArr 导出Excel表头

    * @param {String} sheetName 导出sheetName名字
    * @return:
    */
export function exportExcel(
  json: { [x: string]: any; hasOwnProperty: (arg0: string) => any },
  name: any,
  titleArr: any[],
  sheetName: string | undefined,
) {
  /* convert state to workbook */
  const data = [];
  const keyArray = [];
  const getLength = function (obj: { hasOwnProperty: (arg0: string) => any }) {
    let count = 0;
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        count += 1;
      }
    }
    return count;
  };
  for (const key1 in json) {
    if (json.hasOwnProperty(key1)) {
      const element = json[key1];
      const rowDataArray = [];
      for (const key2 in element) {
        if (element.hasOwnProperty(key2)) {
          const element2 = element[key2];
          rowDataArray.push(element2);
          if (keyArray.length < getLength(element)) {
            keyArray.push(key2);
          }
        }
      }
      data.push(rowDataArray);
    }
  }
  // keyArray为英文字段表头
  data.splice(0, 0, keyArray, titleArr);
  console.log('data', data);
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  // 此处隐藏英文字段表头
  const wsrows = [{ hidden: true }];
  ws['!rows'] = wsrows; // ws - worksheet
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  /* generate file and send to client */
  XLSX.writeFile(wb, `${name}.xlsx`);
}
