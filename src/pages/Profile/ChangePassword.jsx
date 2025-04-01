import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthReducer from '../../stores/AuthReducer';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty('Current password is required'),
    password: z
      .string()
      .nonempty('New password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: z.string().nonempty('Confirm new password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const { changePassword, isChangePassLoading } = useAuthReducer(
    (state) => state
  );

  const onSubmit = (data) => {
    changePassword(data);
  };

  return (
    <div className="change-pass">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 row input-grp">
        <div className="col-md-6 input-wrp">
          <label className="form-label">Old password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter the current password"
            {...register('currentPassword')}
          />
          {errors.currentPassword && (
            <span className="error">{errors.currentPassword.message}</span>
          )}
        </div>
      </div>
      <div className="mb-3 row input-grp">
        <div className="col-md-6 input-wrp">
          <label className="form-label">New password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter the new password"
            {...register('password')}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <div className="col-md-6 input-wrp">
          <label className="form-label">Re-enter the new password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter the new password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>
      </div>
      <div className="bottom-btn-sec">
        <button
          type="button"
          className="btn btn-cancel"
          onClick={() => reset()}
        >
          Clear
        </button>
        <button type="submit" className="btn btn-submit">
          {isChangePassLoading ? 'Loading' : 'Submit'}
        </button>
      </div>
    </form>
    </div>
  );
};

export default ChangePassword;
