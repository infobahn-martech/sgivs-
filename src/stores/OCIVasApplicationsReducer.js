import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import ociVasApplicationsService from '../services/ociVasApplicationsService';

const useOCIVasApplicationsReducer = create((set) => ({
    ociVasApplicationsData: null,
    isLoadingGet: false,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await ociVasApplicationsService.getData(params);
            const datas = data;
            set({
                ociVasApplicationsData: datas?.data,
                // successMessage: data?.response?.data?.message ?? data?.message,
                isLoadingGet: false,
            });
        } catch (err) {
            const { error } = useAlertReducer.getState();
            set({
                errorMessage: err?.response?.data?.message ?? err?.message,
                isLoadingGet: false,
            });
            error(err?.response?.data?.message ?? err.message);
        }
    },

}));

export default useOCIVasApplicationsReducer;
