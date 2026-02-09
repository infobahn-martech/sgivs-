import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import CustomSelect from '../../components/common/CustomSelect';

const USE_MOCK = true;

// ✅ Dropdown data
const countryOptions = [
  { label: 'Oman', value: 'Oman' },
  { label: 'UAE', value: 'UAE' },
];

const centerOptions = [
  { label: 'Salalah', value: 'Salalah' },
  { label: 'Sohar', value: 'Sohar' },
  { label: 'Ibri', value: 'Ibri' },
  { label: 'Ibra', value: 'Ibra' },
  { label: 'Nizwa', value: 'Nizwa' },
  { label: 'Sur', value: 'Sur' },
  { label: 'Buraimi', value: 'Buraimi' },
  { label: 'Duqm', value: 'Duqm' },
  { label: 'Khasab', value: 'Khasab' },
  { label: 'Muscat', value: 'Muscat' },
  { label: 'Barka', value: 'Barka' },
];

// ✅ Mock counter options (replace with API later)
const counterOptions = [
  { label: 'Counter 1', value: '1' },
  { label: 'Counter 2', value: '2' },
  { label: 'Counter 3', value: '3' },
];

const signUpSchema = z.object({
  username: z.string().nonempty('Username is required').max(50, 'Max 50 characters'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  country: z.string().nonempty('Country is required'),
  center: z.string().nonempty('Center is required'),
  counterId: z.string().nonempty('Counter is required'),
  isBackOfficeStaff: z.boolean().optional(),
});

export default function SignUp({ showModal, closeModal, onRefreshSignUp }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      country: '',
      center: '',
      counterId: '',
      isBackOfficeStaff: false,
    },
    mode: 'onSubmit',
  });

  const selectedCountry = watch('country');
  const selectedCenter = watch('center');
  const selectedCounterId = watch('counterId');
  const isBackOfficeStaff = watch('isBackOfficeStaff');

  const onSubmit = (data) => {
    if (USE_MOCK) {
      onRefreshCounter?.();
      closeModal?.();
      reset();
      return;
    }

    // ✅ When API ready, call your login/register action here
    // postData(data, () => onRefreshCounter?.());
    closeModal?.();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">Sign Up</h4>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        onClick={() => {
          closeModal?.();
          reset();
        }}
      />
    </>
  );

  const renderBody = () => (
    <div className="modal-body">
      <div className="row">

        {/* Username */}
        <div className="col-12">
          <div className="form-group forms-custom">
            <label className="label">
              Username<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              {...register('username')}
            />
            {errors.username && <span className="error">{errors.username.message}</span>}
          </div>
        </div>

        {/* Password */}
        <div className="col-12">
          <div className="form-group forms-custom">
            <label className="label">
              Password<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...register('password')}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>
        </div>

        {/* Country */}
        <div className="col-12">
          <div className="form-group forms-custom">
            <label className="label">
              Country<span className="text-danger">*</span>
            </label>
            <CustomSelect
              options={countryOptions}
              value={countryOptions.find(o => o.value === selectedCountry) || null}
              onChange={(selected) => setValue('country', selected?.value || '')}
              placeholder="Select Country"
              showIndicator={false}
              className="form-select form-control"
            />
            {errors.country && <span className="error">{errors.country.message}</span>}
          </div>
        </div>

        {/* Center */}
        <div className="col-12">
          <div className="form-group forms-custom">
            <label className="label">
              Center<span className="text-danger">*</span>
            </label>
            <CustomSelect
              options={centerOptions}
              value={centerOptions.find(o => o.value === selectedCenter) || null}
              onChange={(selected) => setValue('center', selected?.value || '')}
              placeholder="Select Center"
              showIndicator={false}
              className="form-select form-control"
            />
            {errors.center && <span className="error">{errors.center.message}</span>}
          </div>
        </div>

        {/* Counter */}
        <div className="col-12">
          <div className="form-group forms-custom">
            <label className="label">
              Counter<span className="text-danger">*</span>
            </label>
            <CustomSelect
              options={counterOptions}
              value={counterOptions.find(o => o.value === selectedCounterId) || null}
              onChange={(selected) => setValue('counterId', selected?.value || '')}
              placeholder="Select Counter"
              showIndicator={false}
              className="form-select form-control"
            />
            {errors.counterId && <span className="error">{errors.counterId.message}</span>}
          </div>
        </div>

        {/* Checkbox */}
        <div className="col-12">
          <div className="form-group forms-custom">
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="isBackOfficeStaff"
                checked={!!isBackOfficeStaff}
                onChange={(e) => setValue('isBackOfficeStaff', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="isBackOfficeStaff">
                Sign in as back office staff
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );


  const renderFooter = () => (
    <div className="modal-footer bottom-btn-sec signup-btn-sec">
      <button
        type="button"
        className="btn btn-cancel"
        onClick={() => {
          closeModal?.();
          reset();
        }}
      >
        Cancel
      </button>

      <button
        type="button"
        className="btn btn-submit"
        onClick={handleSubmit(onSubmit)}
        disabled={false}
      >
        Save
      </button>
    </div>
  );

  return (
    <CustomModal
      className="modal fade show"
      dialgName="modal-dialog-scrollable"
      show={!!showModal}
      closeModal={() => {
        closeModal?.();
        reset();
      }}
      body={renderBody()}
      header={renderHeader()}
      footer={renderFooter()}
      isLoading={false}
    />
  );
}
