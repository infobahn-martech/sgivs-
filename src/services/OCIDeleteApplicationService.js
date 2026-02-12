import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/visa-delete-application', { params });
const deleteData = (id) => Gateway.delete(`/visa-delete-application/${id}`);

export default { getData, deleteData };
