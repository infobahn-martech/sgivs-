import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import rentalService from '../services/rentalService';

const useRentalReducer = create((set) => ({
  rentalData: null,
  errorMessage: '',
  successMessage: '',
  isUsersLoading: false,
  userActionLoading: false,

  getAllRentals: async () => {
    try {
      set({ isUsersLoading: true });
      const { data } = await rentalService.getAllRentals();
      const rentalData = data.rental;
      set({ rentalData, isUsersLoading: false });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isUsersLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  }
}));

export default useRentalReducer;
