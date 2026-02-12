import { create } from 'zustand';
import visaApplicationService from '../services/VisaApplicationService';
import useAlertReducer from './AlertReducer';


const useVisaApplicationReducer = create((set) => ({
  isCreateVisaApplicationLoading: false,
  isUpdateVisaApplicationLoading: false,
  isDeleteVisaApplicationLoading: false,
  errorMessage: '',
  successMessage: '',
  visaApplicationsData: [],
  isLoadingGet: false,
  pagination: {},

  createVisaApplication: async (data) => {
    try {
      set({ isCreateVisaApplicationLoading: true });
      const { data } = await visaApplicationService.createVisaApplication(data);
      set({ isCreateVisaApplicationLoading: false });
      const { success } = useAlertReducer.getState();
      success(data?.response?.data?.message ?? data?.message);
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isCreateVisaApplicationLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  updateVisaApplication: async (id, data) => {
    try {
      set({ isUpdateVisaApplicationLoading: true });
      const { data } = await visaApplicationService.updateVisaApplication(id, data);
      const { success } = useAlertReducer.getState();
      success(data?.response?.data?.message ?? data?.message);
      set({
        successMessage: data?.response?.data?.message ?? data?.message,
        isUpdateVisaApplicationLoading: false,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isDeleteVisaApplicationLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  deleteVisaApplication: async (id) => {
    try {
      set({ isDeleteVisaApplicationLoading: true });
      const { data } = await visaApplicationService.deleteVisaApplication(id);
      const { success } = useAlertReducer.getState();
      success(data?.response?.data?.message ?? data?.message);
      set({
        successMessage: data?.response?.data?.message ?? data?.message,
        isDeleteVisaApplicationLoading: false,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isDeleteVisaApplicationLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },

  getVisaApplications: async (params) => {
    try {
      set({ isLoadingGet: true });
      const { data } = await visaApplicationService.getVisaApplications(params);
      const visaApplicationsData = data?.data;
      set({ visaApplicationsData, isLoadingGet: false, pagination: data?.pagination });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isLoadingGet: false,
        visaApplicationsData: [],
        pagination: {},
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },



}));

export default useVisaApplicationReducer;
