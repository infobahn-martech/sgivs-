import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import attestationCounterDeliveryService from '../services/AttestationCounterDeliveryService';

const useAttestationCounterDeliveryReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    attestationCounterDeliveryData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await attestationCounterDeliveryService.getData(params);
            const datas = data;
            set({
                attestationCounterDeliveryData: datas?.data,
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

export default useAttestationCounterDeliveryReducer;
