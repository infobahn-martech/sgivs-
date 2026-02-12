import { create } from 'zustand';
import attestationApplicationService from '../services/AttestationApplicationService';
import useAlertReducer from './AlertReducer';


const useAttestationApplicationReducer = create((set) => ({
  isCreateAttestationApplicationLoading: false,
  isUpdateAttestationApplicationLoading: false,
  isDeleteAttestationApplicationLoading: false,
  errorMessage: '',
  successMessage: '',
  attestationApplicationsData: [],
  isLoadingGet: false,
  pagination: {},

  createAttestationApplication: async (data) => {
    try {
      set({ isCreateAttestationApplicationLoading: true });
      const { data } = await attestationApplicationService.createAttestationApplication(data);
      set({ isCreateAttestationApplicationLoading: false });
      const { success } = useAlertReducer.getState();
      success(data?.response?.data?.message ?? data?.message);
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isCreateAttestationApplicationLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  updateAttestationApplication: async (id, data) => {
    try {
      set({ isUpdateAttestationApplicationLoading: true });
      const { data } = await attestationApplicationService.updateAttestationApplication(id, data);
      const { success } = useAlertReducer.getState();
      success(data?.response?.data?.message ?? data?.message);
      set({
        successMessage: data?.response?.data?.message ?? data?.message,
        isUpdateAttestationApplicationLoading: false,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isDeleteAttestationApplicationLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  deleteAttestationApplication: async (id) => {
    try {
      set({ isDeleteAttestationApplicationLoading: true });
      const { data } = await attestationApplicationService.deleteAttestationApplication(id);
      const { success } = useAlertReducer.getState();
      success(data?.response?.data?.message ?? data?.message);
      set({
        successMessage: data?.response?.data?.message ?? data?.message,
        isDeleteAttestationApplicationLoading: false,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isDeleteAttestationApplicationLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },

  getAttestationApplications: async (params) => {
    try {
      set({ isLoadingGet: true });
      const { data } = await attestationApplicationService.getAttestationApplications(params);
      const attestationApplicationsData = data?.data;
      set({ attestationApplicationsData, isLoadingGet: false, pagination: data?.pagination });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isLoadingGet: false,
        attestationApplicationsData: [],
        pagination: {},
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },



}));

export default useAttestationApplicationReducer;
