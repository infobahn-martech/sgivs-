import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/appointment-type', payload);
const patchData = (id, payload) => Gateway.put(`/appointment-type/${id}`, payload);
const getData = (params) => Gateway.get('/appointment-type', { params });
const deleteData = (id) => Gateway.delete(`/appointment-type/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
