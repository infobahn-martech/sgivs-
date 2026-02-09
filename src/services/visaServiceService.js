import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/visa-service', payload);
const patchData = (id, payload) => Gateway.put(`/visa-service/${id}`, payload);
const getData = (params) => Gateway.get('/visa-service', { params });
const deleteData = (id) => Gateway.delete(`/visa-service/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
