import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import ociOTSService from '../services/OCIOTSService';

const useOCIOTSReducer = create((set) => ({
    isLoadingGet: false,
    ociOTSData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await ociOTSService.getData(params);
            const datas = data;
            set({
                ociOTSData: datas?.data,
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

export default useOCIOTSReducer;
