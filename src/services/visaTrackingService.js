import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/visa-tracking', payload);
const patchData = (id, payload) => Gateway.put(`/visa-tracking/${id}`, payload);
const getData = (params) => Gateway.get('/visa-tracking', { params });
const deleteData = (id) => Gateway.delete(`/visa-tracking/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
