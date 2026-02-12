import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import otsService from '../services/otsService';

const useOTSReducer = create((set) => ({
    isLoading: false,
    isLoadingGet: false,
    errorMessage: '',
    successMessage: '',
    otsData: null,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await otsService.getData(params);
            const datas = data;
            set({
                otsData: datas?.data,
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

export default useOTSReducer;
