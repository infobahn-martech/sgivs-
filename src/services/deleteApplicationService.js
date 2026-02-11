import Gateway from '../config/gateway';

const getData = (params) => Gateway.get('/delete-application', { params });
const deleteData = (id) => Gateway.delete(`/delete-application/${id}`);

export default { getData, deleteData };
