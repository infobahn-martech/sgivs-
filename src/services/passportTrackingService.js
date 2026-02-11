import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/passport-tracking', payload);
const patchData = (id, payload) => Gateway.put(`/passport-tracking/${id}`, payload);
const getData = (params) => Gateway.get('/passport-tracking', { params });
const deleteData = (id) => Gateway.delete(`/passport-tracking/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
