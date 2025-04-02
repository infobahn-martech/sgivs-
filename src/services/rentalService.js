import Gateway from '../config/gateway';

const getAllRentals = (params) => Gateway.get('rental', { params });

const changeStatus = ({ id, status }) =>
  Gateway.put(`rental/${id}`, { status });

export default {
  getAllRentals,
  changeStatus,
};
