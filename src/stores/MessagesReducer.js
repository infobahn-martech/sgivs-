import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import MessagesService from '../services/MessagesService';

const messagesReducer = create((set) => ({
  isLoadingContact: false,
  isLoadingAddUser: false,
  loadingSelectedUsers: false,
  errorMessage: '',
  successMessage: '',
  contacts: null,
  selectedUsers: null,
  isLoadingPostMessage: false,
  usersTotalCount: null,
  messageIdData: null,

  getAllContacts: async () => {
    try {
      set({ isLoadingContact: true });
      const { data } = await MessagesService.getAllContacts();
      set({
        contacts: data.data?.data,
        successMessage: data?.response?.data?.message ?? data?.message,
        isLoadingContact: false,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isLoadingContact: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },

  addUsers: async (payload, cb) => {
    try {
      set({ isLoadingAddUser: true });
      const { data } = await MessagesService.addUsers(payload);
      const { success } = useAlertReducer.getState();
      success(data?.response?.data?.message ?? data?.message);
      set({
        successMessage: data?.response?.data?.message ?? data?.message,
        isLoadingAddUser: false,
      });
      cb && cb();
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isLoadingAddUser: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
  deleteUser: async ({ id }, cb) => {
    try {
      set({ isLoadingDelete: true });
      const { data } = await MessagesService.deleteUser(id);
      const { success } = useAlertReducer.getState();
      success(data?.response?.data?.message ?? data?.message);
      set({
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

  getSelectedUsers: async (params) => {
    try {
      set({ loadingSelectedUsers: true });
      const { data } = await MessagesService.getUsers(params);
      set({
        selectedUsers: data.data?.data,
        successMessage: data?.response?.data?.message ?? data?.message,
        loadingSelectedUsers: false,
        usersTotalCount: data?.data?.total,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        loadingSelectedUsers: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },

  GetMessageById: async (id, params) => {
    try {
      set({ loadingMessageById: true });
      const { data } = await MessagesService.GetMessageById(id, params);
      set({
        messageIdData: data.data,
        successMessage: data?.response?.data?.message ?? data?.message,
        loadingMessageById: false,
      });
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        loadingMessageById: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },

  postMessage: async (payload, cb) => {
    try {
      set({ isLoadingPostMessage: true });
      const { data } = await MessagesService.postMessage(payload);
      // const { success } = useAlertReducer.getState();
      // success(data?.response?.data?.message ?? data?.message);
      set({
        successMessage: data?.response?.data?.message ?? data?.message,
        isLoadingPostMessage: false,
      });
      cb && cb();
    } catch (err) {
      const { error } = useAlertReducer.getState();
      set({
        errorMessage: err?.response?.data?.message ?? err?.message,
        isLoadingPostMessage: false,
      });
      error(err?.response?.data?.message ?? err.message);
    }
  },
}));

export default messagesReducer;
