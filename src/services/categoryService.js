import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/category', payload);
const patchData = (id, payload) => Gateway.put(`/category/${id}`, payload);
const getData = (params) => Gateway.get('/category', { params });
const deleteData = (id) => Gateway.delete(`/category/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
