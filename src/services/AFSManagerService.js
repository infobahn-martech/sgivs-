import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/afs-manager', payload);
const patchData = (id, payload) => Gateway.put(`/afs-manager/${id}`, payload);
const getData = (params) => Gateway.get('/afs-manager', { params });
const deleteData = (id) => Gateway.delete(`/afs-manager/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
