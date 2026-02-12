import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import attestationDeleteApplicationService from '../services/attestationDeleteApplicationService';

const useAttestationDeleteApplicationReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    isLoadingDelete: false,
    errorMessage: '',
    successMessage: '',
    attestationDeleteApplicationData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await attestationDeleteApplicationService.getData(params);
            const datas = data;
            set({
                attestationDeleteApplicationData: datas?.data,
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
    deleteData: async (id, cb) => {
        try {
            set({ isLoadingDelete: true });
            const { data } = await attestationDeleteApplicationService.deleteData(id);
            const datas = data;
            set({
                attestationDeleteApplicationData: datas?.data,
                successMessage: data?.response?.data?.message ?? data?.message,
                isLoadingDelete: false,
            });
            cb && cb();
        } catch (err) {
            const { error } = useAlertReducer.getState();
            set({
                errorMessage: err?.response?.data?.message ?? err?.message,
                isLoadingDelete: false,
            });
            error(err?.response?.data?.message ?? err.message);
        }
    },
}));

export default useAttestationDeleteApplicationReducer;
