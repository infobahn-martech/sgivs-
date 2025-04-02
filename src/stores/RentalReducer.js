import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import rentalService from '../services/rentalService';
import { downloadFile } from '../config/config';
import Gateway from '../config/gateway';

const useRentalReducer = create((set) => ({
  rentalData: null,
  notes: null,
  errorMessage: '',
  successMessage: '',
  isRentalLoading: false,
  isNoteLoading: false,
  isExportLoading: false,
  userActionLoading: false,
  statusLoading: false,

  getAllRentals: async (params) => {
    try {
      set({ isRentalLoading: true, successMessage: '' });
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
    set({ isExportLoading: true, successMessage: '' });

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
  changeStatus: async ({ id, status, dueDate, cb }) => {
    console.log('daaa', id);
    set({ statusLoading: true });

    const { success, error } = useAlertReducer.getState();
    try {
      set({ successMessage: '' });
      const { data } = await rentalService.changeStatus({
        id,
        status,
        dueDate,
      });
      success(data.message);
      set({
        successMessage: data.message,
        statusLoading: false,
      });
      cb && cb();
    } catch (err) {
      error(err?.response?.data?.message ?? err?.message);
      set({
        successMessage: null,
        statusLoading: false,
      });
    }
  },

  getRentalNotes: async (params) => {
    try {
      console.log('params', params);
      set({ isNoteLoading: true, successMessage: '' });
      const { data } = await rentalService.getNotes(params);
      const notes = data.rental;
      set({ notes, isNoteLoading: false });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isNoteLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
}));

export default useRentalReducer;
