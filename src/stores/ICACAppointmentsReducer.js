import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import icacAppointmentsService from '../services/icacAppointmentsService';

const useICACAppointmentsReducer = create((set) => ({
    icacAppointmentsData: null,
    isLoadingGet: false,

    getData: async (params) => {
        try {
            set({ isLoadingGet: true });
            const { data } = await icacAppointmentsService.getData(params);
            const datas = data;
            set({
                icacAppointmentsData: datas?.data,
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

export default useICACAppointmentsReducer;
