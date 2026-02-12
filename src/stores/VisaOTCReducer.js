import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import ifmService from '../services/ifmService';

const useIFMReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    ifmData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await ifmService.getData(params);
            const datas = data;
            set({
                ifmData: datas?.data,
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

export default useIFMReducer;
