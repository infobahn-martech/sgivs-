import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/role', payload);
const patchData = (id, payload) => Gateway.put(`/role/${id}`, payload);
const getData = (params) => Gateway.get('/role', { params });
const deleteData = (id) => Gateway.delete(`/role/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
