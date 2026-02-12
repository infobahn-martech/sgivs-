import Gateway from '../config/gateway';

const createVisaApplication = (data) => Gateway.post('visa-application', data);
const getVisaApplications = (params) => Gateway.get('visa-application', { params });

const updateVisaApplication = (id, data) => Gateway.patch(`visa-application/${id}`, data);

const deleteVisaApplication = (id) => Gateway.delete(`visa-application/${id}`);

export default {
  getVisaApplications,
  createVisaApplication,
  updateVisaApplication,
  deleteVisaApplication,
};
