import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import rentalService from '../services/rentalService';
import { downloadFile } from '../config/config';
import Gateway from '../config/gateway';

const useRentalReducer = create((set) => ({
  rentalData: null,
  errorMessage: '',
  successMessage: '',
  isRentalLoading: false,
  isExportLoading: false,
  userActionLoading: false,

  getAllRentals: async (params) => {
    try {
      set({ isRentalLoading: true });
      const { data } = await rentalService.getAllRentals(params);
      const rentalData = data.rental;
      set({ rentalData, isRentalLoading: false });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isRentalLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },

  exportRental: async (params) => {
    set({ isExportLoading: true });

    try {
      await downloadFile({
        url: 'rental',
        params,
        fileName: 'rental_data.xlsx',
        extractFilePath: (response) => response?.data?.rental,
      });

      set({ isExportLoading: false });
    } catch (err) {
      useAlertReducer.getState().error(err.message);
      set({ isExportLoading: false });
    }
  },
}));

export default useRentalReducer;
