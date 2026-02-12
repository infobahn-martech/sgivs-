import { create } from 'zustand';
import ociApplicationService from '../services/OCIApplicationService';
import useAlertReducer from './AlertReducer';


const useOCIApplicationReducer = create((set) => ({
    isCreateOCIApplicationLoading: false,
    isUpdateOCIApplicationLoading: false,
    isDeleteOCIApplicationLoading: false,
    errorMessage: '',
    successMessage: '',
    ociApplicationsData: [],
    isLoadingGet: false,
    pagination: {},

    createOCIApplication: async (data) => {
        try {
            set({ isCreateOCIApplicationLoading: true });
            const { data } = await ociApplicationService.createOCIApplication(data);
            set({ isCreateOCIApplicationLoading: false });
            const { success } = useAlertReducer.getState();
            success(data?.response?.data?.message ?? data?.message);
        } catch (err) {
            const { error } = useAlertReducer.getState();
            set({
                errorMessage: err?.response?.data?.message ?? err?.message,
                isCreateOCIApplicationLoading: false,
            });
            error(err?.response?.data?.message ?? err.message);
        }
    },
    updateOCIApplication: async (id, data) => {
        try {
            set({ isUpdateOCIApplicationLoading: true });
            const { data } = await ociApplicationService.updateOCIApplication(id, data);
            const { success } = useAlertReducer.getState();
            success(data?.response?.data?.message ?? data?.message);
            set({
                successMessage: data?.response?.data?.message ?? data?.message,
                isUpdateOCIApplicationLoading: false,
            });
        } catch (err) {
            const { error } = useAlertReducer.getState();
            set({
                errorMessage: err?.response?.data?.message ?? err?.message,
                isDeleteOCIApplicationLoading: false,
            });
            error(err?.response?.data?.message ?? err.message);
        }
    },
    deleteOCIApplication: async (id) => {
        try {
            set({ isDeleteOCIApplicationLoading: true });
            const { data } = await ociApplicationService.deleteOCIApplication(id);
            const { success } = useAlertReducer.getState();
            success(data?.response?.data?.message ?? data?.message);
            set({
                successMessage: data?.response?.data?.message ?? data?.message,
                isDeleteOCIApplicationLoading: false,
            });
        } catch (err) {
            const { error } = useAlertReducer.getState();
            set({
                errorMessage: err?.response?.data?.message ?? err?.message,
                isDeleteOCIApplicationLoading: false,
            });
            error(err?.response?.data?.message ?? err.message);
        }
    },

    getOCIApplications: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await ociApplicationService.getOCIApplications(params);
            const ociApplicationsData = data?.data;
            set({ ociApplicationsData, isLoadingGet: false, pagination: data?.pagination });
        } catch (err) {
            const { error } = useAlertReducer.getState();
            set({
                isLoadingGet: false,
                ociApplicationsData: [],
                pagination: {},
            });
            error(err?.response?.data?.message ?? err.message);
        }
    },



}));

export default useOCIApplicationReducer;
