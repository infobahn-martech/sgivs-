import Gateway from '../config/gateway';

const getAllRentals = (params) => Gateway.get('rental', { params });

const changeStatus = ({ id, status, dueDate }) =>
  Gateway.put(`rental/${id}`, { status, dueDate });

export default {
  getAllRentals,
  changeStatus,
};
