import { create } from 'zustand';
import { deleteFiles, uploadFiles } from '../services/commonServices';

const useCommonStore = create((set) => ({
  isUploading: false,
  files: [],
  uploadFiles: async (files) => {
    try {
      set({ isUploading: true, files: [] });
      const { data } = await uploadFiles(files);
      console.log(' data', data);
      set({ isUploading: false, files: data.uploadedFiles });
    } catch (err) {
      console.log(' error', err);
      set({ isUploading: false, files: [] });
    }
  },
  deleteFile: async (key) => {
    try {
      set({ isUploading: true, files: [] });
      const { data } = await deleteFiles(key);
      console.log(' data', data);
      set({ isUploading: false,  });
    } catch (err) {
      console.log(' error', err);
      set({ isUploading: false, files: [] });
    }
  },
}));

export default useCommonStore;
