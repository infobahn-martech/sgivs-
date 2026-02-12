import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import visaOTMService from '../services/VisaOTMService';
const useVisaOTMReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    visaOTMData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await visaOTMService.getData(params);
            const datas = data;
            set({
                visaOTMData: datas?.data,
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

export default useVisaOTMReducer;
