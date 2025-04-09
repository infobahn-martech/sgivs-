import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/subcategory', payload);
const patchData = (id, payload) => Gateway.put(`/subcategory/${id}`, payload);
const getData = () => Gateway.get('/subcategory');
const deleteData = (id) => Gateway.delete(`/subcategory/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
