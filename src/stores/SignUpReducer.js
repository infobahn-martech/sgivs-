import { create } from 'zustand';
import useAlertReducer from './AlertReducer';
import signUpService from '../services/signUpService';

const useSignUpReducer = create((set) => ({
    isLoading: false,
    errorMessage: '',
    successMessage: '',

    signUp: async (payload, cb) => {
        try {
            set({ isLoading: true });
            const { data } = await signUpService.postData(payload);
            const { success } = useAlertReducer.getState();
            success(data?.response?.data?.message ?? data?.message);
            set({
                successMessage: data?.response?.data?.message ?? data?.message,
                isLoading: false,
            });
            cb && cb();
        } catch (err) {
            const { error } = useAlertReducer.getState();
            set({
                errorMessage: err?.response?.data?.message ?? err?.message,
                isLoading: false,
            });
            error(err?.response?.data?.message ?? err.message);
        }
    },
}));

export default useSignUpReducer;
