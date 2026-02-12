import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import visaIFMService from '../services/VisaIFMService';

const useVisaIFMReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    visaIFMData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await visaIFMService.getData(params);
            const datas = data;
            set({
                visaIFMData: datas?.data,
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

export default useVisaIFMReducer;
