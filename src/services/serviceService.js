import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/service', payload);
const patchData = (id, payload) => Gateway.put(`/service/${id}`, payload);
const getData = (params) => Gateway.get('/service', { params });
const getAllServiceType = () => Gateway.get('/service-type');
const deleteData = (id) => Gateway.delete(`/service/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
  getAllServiceType,
};
