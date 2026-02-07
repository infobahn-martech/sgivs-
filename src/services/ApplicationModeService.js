import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/application-mode', payload);
const patchData = (id, payload) => Gateway.put(`/application-mode/${id}`, payload);
const getData = (params) => Gateway.get('/application-mode', { params });
const deleteData = (id) => Gateway.delete(`/application-mode/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
