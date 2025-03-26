import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import rentalService from '../services/rentalService';

const useRentalReducer = create((set) => ({
  rentalData: null,
  errorMessage: '',
  successMessage: '',
  isRentalLoading: false,
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
  }
}));

export default useRentalReducer;
