import Gateway from '../config/gateway';

const createOCIApplication = (data) => Gateway.post('oci-application', data);
const getOCIApplications = (params) => Gateway.get('oci-application', { params });

const updateOCIApplication = (id, data) => Gateway.patch(`oci-application/${id}`, data);

const deleteOCIApplication = (id) => Gateway.delete(`oci-application/${id}`);

export default {
  getOCIApplications,
  createOCIApplication,
  updateOCIApplication,
  deleteOCIApplication,
};
