import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import visaVasApplicationsService from '../services/visaVasApplicationsService';

const useVisaVasApplicationsReducer = create((set) => ({
    returnFromMissionData: null,
    isLoadingGet: false,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await visaVasApplicationsService.getData(params);
            const datas = data;
            set({
                visaVasApplicationsData: datas?.data,
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

export default useVisaVasApplicationsReducer;
