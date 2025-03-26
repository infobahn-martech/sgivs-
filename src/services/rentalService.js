import Gateway from '../config/gateway';

const getAllRentals = (params) => Gateway.get('rental', { params });

export default {
  getAllRentals,
};
