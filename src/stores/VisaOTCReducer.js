import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import visaOTCService from '../services/VisaOTCService';

const useVisaOTCReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    visaOTCData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await visaOTCService.getData(params);
            const datas = data;
            set({
                visaOTCData: datas?.data,
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

export default useVisaOTCReducer;
