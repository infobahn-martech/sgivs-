import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import ociOTMService from '../services/ociOTMService';

const useOCIOTMReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    ociOTMData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await ociOTMService.getData(params);
            const datas = data;
            set({
                ociOTMData: datas?.data,
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

export default useOCIOTMReducer;
