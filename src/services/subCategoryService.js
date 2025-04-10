import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/sub-category', payload);
const patchData = (id, payload) => Gateway.put(`/sub-category/${id}`, payload);
const getData = (params) => Gateway.get('/sub-category', { params });
const getAllCategory = () => Gateway.get('/sub-category/all-categories');
const deleteData = (id) => Gateway.delete(`/sub-category/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
  getAllCategory,
};
