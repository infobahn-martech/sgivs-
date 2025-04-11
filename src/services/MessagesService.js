import Gateway from '../config/gateway';

const getAllContacts = () => Gateway.get('/conversation/all-users');
const addUsers = (id) => Gateway.post('/conversation', id);
const deleteUser = (id) => Gateway.delete(`/conversation/${id}`);

const getUsers = (params) => Gateway.get('/conversation', { params });

export default {
  getAllContacts,
  addUsers,
  getUsers,
  deleteUser,
};
