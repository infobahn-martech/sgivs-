import Gateway from '../config/gateway';

const getAllRentals = () => Gateway.get('v1/rental');

export default {
  getAllRentals,
};
