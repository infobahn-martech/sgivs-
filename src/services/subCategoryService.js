import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/subCategory', payload);
const getData = () => Gateway.get('/subCategory');

export default {
  postData,
  getData,
};
