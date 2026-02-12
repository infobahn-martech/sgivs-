import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/attestation-delete-application', { params });
const deleteData = (id) => Gateway.delete(`/attestation-delete-application/${id}`);

export default { getData, deleteData };
