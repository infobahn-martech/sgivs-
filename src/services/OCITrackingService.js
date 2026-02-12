import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/oci-tracking', payload);
const patchData = (id, payload) => Gateway.put(`/oci-tracking/${id}`, payload);
const getData = (params) => Gateway.get('/oci-tracking', { params });
const deleteData = (id) => Gateway.delete(`/oci-tracking/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
