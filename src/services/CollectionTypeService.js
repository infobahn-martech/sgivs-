import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/center', payload);
const patchData = (id, payload) => Gateway.put(`/center/${id}`, payload);
const getData = (params) => Gateway.get('/center', { params });
const deleteData = (id) => Gateway.delete(`/center/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
