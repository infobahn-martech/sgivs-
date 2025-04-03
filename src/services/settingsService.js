import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/settings', payload);
const getData = () => Gateway.get('/settings');

export default {
  postData,
  getData,
};
