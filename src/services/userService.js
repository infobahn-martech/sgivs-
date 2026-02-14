import Gateway from '../config/gateway';

const getCountries = () => Gateway.get('users/country');
const getMissions = () => Gateway.get('users/mission');
const getMissionsByCountry = (countryId) =>
  Gateway.get(`users/mission_by_country/${countryId}`);

export default {
  getCountries,
  getMissions,
  getMissionsByCountry,
};
