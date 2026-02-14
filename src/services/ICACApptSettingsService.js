import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/icac-appt-settings', payload);
const patchData = (id, payload) => Gateway.put(`/icac-appt-settings/${id}`, payload);
const getData = (params) => Gateway.get('/icac-appt-settings', { params });
const deleteData = (id) => Gateway.delete(`/icac-appt-settings/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
