import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('/elite-delivery', payload);
const patchData = (id, payload) => Gateway.put(`/elite-delivery/${id}`, payload);
const getData = (params) => Gateway.get('/elite-delivery', { params });
const deleteData = (id) => Gateway.delete(`/elite-delivery/${id}`);

export default {
    postData,
    patchData,
    getData,
    deleteData,
};
