import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/application-type', payload);
const patchData = (id, payload) => Gateway.put(`/application-type/${id}`, payload);
const getData = (params) => Gateway.get('/application-type', { params });
const deleteData = (id) => Gateway.delete(`/application-type/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
