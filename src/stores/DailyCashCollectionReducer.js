import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import dailyCashCollectionService from '../services/dailyCashCollectionService';

const useDailyCashCollectionReducer = create((set) => ({
    dailyCashCollectionData: null,
    isLoadingGet: false,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await dailyCashCollectionService.getData(params);
            const datas = data;
            set({
                dailyCashCollectionData: datas?.data,
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

export default useDailyCashCollectionReducer;
