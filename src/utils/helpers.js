import moment from 'moment';
const url = import.meta.env.VITE_API_ENDPOINT;
export const dateFormat = (value) => moment(value).format('DD MMMM YYYY');
export function excelExport(exportUrl) {
  console.log('first', exportUrl, url);
  const link = document.createElement('a');
  link.href = `${url}${exportUrl}`;
  link.click();
}
