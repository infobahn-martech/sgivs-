import Gateway from '../config/gateway';

const postData = (payload) => Gateway.post('users/add_employee_role', payload);
const patchData = (id, payload) => Gateway.put(`users/update_employee_role/${id}`, payload);
const getData = (params) => Gateway.get('users/get_all_employee_role', { params });
const deleteData = (id) => Gateway.delete(`users/delete_employee_role/${id}`);

export default {
  postData,
  patchData,
  getData,
  deleteData,
};
