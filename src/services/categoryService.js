import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/category', payload);
const getData = () => Gateway.get('/category');

export default {
  postData,
  getData,
};
