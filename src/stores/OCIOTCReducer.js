import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import ociOTCService from '../services/OCIOTCService';

const useOCIOTCReducer = create((set) => ({
    isLoadingGet: false,
    ociOTCData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await ociOTCService.getData(params);
            const datas = data;
            set({
                ociOTCData: datas?.data,
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

export default useOCIOTCReducer;
