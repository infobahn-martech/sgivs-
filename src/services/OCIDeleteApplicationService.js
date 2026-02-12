import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/oci-delete-application', { params });
const deleteData = (id) => Gateway.delete(`/oci-delete-application/${id}`);

export default { getData, deleteData };
