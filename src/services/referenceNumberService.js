import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/reference-number', payload);

export default {
  postData,

};
