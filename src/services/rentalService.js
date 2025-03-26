import Gateway from '../config/gateway';

const getAllRentals = () => Gateway.get('rental');

export default {
  getAllRentals,
};
