import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/visa-entry', payload);
const patchData = (id, payload) => Gateway.put(`/visa-entry/${id}`, payload);
const getData = (params) => Gateway.get('/visa-entry', { params });
const deleteData = (id) => Gateway.delete(`/visa-entry/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
