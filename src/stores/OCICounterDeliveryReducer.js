import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import ociCounterDeliveryService from '../services/OCICounterDeliveryService';

const useOCICounterDeliveryReducer = create((set) => ({
    isLoadingGet: false,
    ociCounterDeliveryData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await ociCounterDeliveryService.getData(params);
            const datas = data;
            set({
                ociCounterDeliveryData: datas?.data,
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

export default useOCICounterDeliveryReducer;
