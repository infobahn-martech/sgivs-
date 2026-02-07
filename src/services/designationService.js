import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/counter', payload);
const patchData = (id, payload) => Gateway.put(`/counter/${id}`, payload);
const getData = (params) => Gateway.get('/counter', { params });
const getAllCenter = () => Gateway.get('/counter/all-centers');
const deleteData = (id) => Gateway.delete(`/counter/${id}`);
const getAllCounter = (id) =>
  Gateway.get(`/counter/all-counters/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
  getAllCenter,
  getAllCounter,
};
