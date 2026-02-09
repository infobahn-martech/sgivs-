import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/optional-service', payload);
const patchData = (id, payload) => Gateway.put(`/optional-service/${id}`, payload);
const getData = (params) => Gateway.get('/optional-service', { params });
const getAllOptionalService = () => Gateway.get('/optional-service/all-optional-services');
const deleteData = (id) => Gateway.delete(`/optional-service/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
  getAllOptionalService,
};
