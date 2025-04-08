import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import rentalService from '../services/rentalService';
import { downloadFile } from '../config/config';
import Gateway from '../config/gateway';
import { get } from 'lodash';

const useRentalReducer = create((set) => ({
  rentalData: null,
  notes: null,
  errorMessage: '',
  successMessage: '',
  isRentalLoading: false,
  noteeditLoading: false,
  isNoteLoading: false,
  isExportLoading: false,
  userActionLoading: false,
  statusLoading: false,
  unMappedtransactions: [],
  transactions: [],
  billingHistory: [],
  getAllRentals: async (params) => {
    try {
      set({ isRentalLoading: true, successMessage: '' });
      const { data } = await rentalService.getAllRentals(params);
      const rentalData = data.loan;
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
        url: 'loan',
        params,
        fileName: 'loan_data.xlsx',
        extractFilePath: (response) => response?.data?.loan,
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
      console.log('data', data);
      const notes = data.data;
      set({ notes, isNoteLoading: false });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isNoteLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  updateNote: async (id, note, cb) => {
    set({ noteeditLoading: true });

    const { success, error } = useAlertReducer.getState();
    try {
      set({ successMessage: '' });
      const { data } = await rentalService.editNote(id, note);
      success(data.message);
      set({
        successMessage: data.message,
        noteeditLoading: false,
      });
      cb && cb();

      useRentalReducer.getState().getRentalNotes({ loanId: id });
    } catch (err) {
      error(err?.response?.data?.message ?? err?.message);
      set({
        successMessage: null,
        noteeditLoading: false,
      });
    }
  },
  // ez pass upload
  uploadEzPass: async (file) => {
    set({ userActionLoading: true });

    const { success, error } = useAlertReducer.getState();
    try {
      set({ successMessage: '' });
      const { data } = await rentalService.uploadEzPass({ file });
      success(data.message);
      set({
        successMessage: data.message,
        userActionLoading: false,
      });
    } catch (err) {
      error(err?.response?.data?.message ?? err?.message);
      set({
        successMessage: null,
        userActionLoading: false,
      });
    }
  },
  getTransactions: async (params) => {
    set({ isRentalLoading: true, successMessage: '' });
    try {
      const { data } = await rentalService.getTransactions(params);
      const { transactions } = data;
      set({ transactions, isRentalLoading: false });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isRentalLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  getBillingHistory: async (params) => {
    set({ isRentalLoading: true, successMessage: '' });
    try {
      const { data } = await rentalService.getHistory(params);
      const {
        transactions: { data: history },
      } = data;
      set({ billingHistory: history, isRentalLoading: false });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isRentalLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  getUnMappedTransactions: async (params) => {
    set({ isRentalLoading: true, successMessage: '' });
    try {
      const { data } = await rentalService.getUnmappedTransactions(params);
      const { transactions } = data;
      set({ unMappedtransactions: transactions, isRentalLoading: false });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        isRentalLoading: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
}));

export default useRentalReducer;
