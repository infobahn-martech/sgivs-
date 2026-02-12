import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/visa-digitization', payload);
const patchData = (id, payload) => Gateway.put(`/visa-digitization/${id}`, payload);
const getData = (params) => Gateway.get('/visa-digitization', { params });
const deleteData = (id) => Gateway.delete(`/visa-digitization/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
