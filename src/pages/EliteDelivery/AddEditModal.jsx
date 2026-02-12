import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useEliteDeliveryReducer from '../../stores/EliteDeliveryReducer';

// ✅ Country code dropdown options (sample)
const countryCodeOptions = [
  { value: '+971', label: '+971 (UAE)' },
  { value: '+91', label: '+91 (India)' },
  { value: '+966', label: '+966 (Saudi)' },
  { value: '+974', label: '+974 (Qatar)' },
  { value: '+968', label: '+968 (Oman)' },
  { value: '+973', label: '+973 (Bahrain)' },
];

// ✅ Updated schema (required fields)
const formSchema = z.object({
  referenceNumber: z.string().nonempty('Reference number is required'),
  applicationType: z.string().nonempty('Application type is required'),
  firstName: z.string().nonempty('First name is required'),

  addressLine1: z.string().nonempty('Address line 1 is required'),
  addressLine2: z.string().nonempty('Address line 2 is required'),

  country: z.string().nonempty('Country is required'),
  city: z.string().nonempty('City is required'),
  postalCode: z.string().nonempty('Postal code is required'),

  countryCode: z.string().nonempty('Country code is required'),
});

export function AddEditModal({ showModal, closeModal, onRefreshEliteDelivery }) {
  const defaultValues = useMemo(
    () => ({
      referenceNumber: '',
      applicationType: '',
      firstName: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      city: '',
      postalCode: '',
      countryCode: '',
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const { postData, patchData, isLoading } = useEliteDeliveryReducer((state) => state);

  // ✅ Prefill form when editing
  useEffect(() => {
    if (showModal?.id) {
      setValue('referenceNumber', showModal?.referenceNumber || '');
      setValue('applicationType', showModal?.applicationType || '');
      setValue('firstName', showModal?.firstName || '');
      setValue('addressLine1', showModal?.addressLine1 || '');
      setValue('addressLine2', showModal?.addressLine2 || '');
      setValue('country', showModal?.country || '');
      setValue('city', showModal?.city || '');
      setValue('postalCode', showModal?.postalCode || '');
      setValue('countryCode', showModal?.countryCode || '');
    } else {
      reset(defaultValues);
    }
  }, [showModal?.id, reset, setValue, defaultValues]);

  const onSubmit = (data) => {
    if (showModal?.id) {
      patchData({ id: showModal.id, ...data }, () => {
        onRefreshEliteDelivery();
      });
    } else {
      postData(data, () => {
        onRefreshEliteDelivery();
      });
    }
    closeModal();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">
        {showModal?.id ? 'Edit Elite Delivery' : 'Add Elite Delivery'}
      </h4>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        onClick={closeModal}
      />
    </>
  );

  const renderBody = () => (
    <div className="modal-body custom-scroll">
      <div className="row">
        {/* Reference number */}
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">
              Reference number<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              {...register('referenceNumber')}
            />
            {errors.referenceNumber && (
              <span className="error">{errors.referenceNumber.message}</span>
            )}
          </div>
        </div>

        {/* Application type */}
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">
              Application type<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              {...register('applicationType')}
            />
            {errors.applicationType && (
              <span className="error">{errors.applicationType.message}</span>
            )}
          </div>
        </div>

        {/* First name */}
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">
              First name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              {...register('firstName')}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName.message}</span>
            )}
          </div>
        </div>

        {/* Country code dropdown */}
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">
              Country code<span className="text-danger">*</span>
            </label>
            <select className="form-control" {...register('countryCode')}>
              <option value="">Select</option>
              {countryCodeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.countryCode && (
              <span className="error">{errors.countryCode.message}</span>
            )}
          </div>
        </div>

        {/* Address line 1 */}
        <div className="col-md-12">
          <div className="form-group">
            <label className="form-label">
              Address line 1<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              {...register('addressLine1')}
            />
            {errors.addressLine1 && (
              <span className="error">{errors.addressLine1.message}</span>
            )}
          </div>
        </div>

        {/* Address line 2 */}
        <div className="col-md-12">
          <div className="form-group">
            <label className="form-label">
              Address line 2<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              {...register('addressLine2')}
            />
            {errors.addressLine2 && (
              <span className="error">{errors.addressLine2.message}</span>
            )}
          </div>
        </div>

        {/* Country */}
        <div className="col-md-4">
          <div className="form-group">
            <label className="form-label">
              Country<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              {...register('country')}
            />
            {errors.country && <span className="error">{errors.country.message}</span>}
          </div>
        </div>

        {/* City */}
        <div className="col-md-4">
          <div className="form-group">
            <label className="form-label">
              City<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              {...register('city')}
            />
            {errors.city && <span className="error">{errors.city.message}</span>}
          </div>
        </div>

        {/* Postal code */}
        <div className="col-md-4">
          <div className="form-group">
            <label className="form-label">
              Postal code<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              {...register('postalCode')}
            />
            {errors.postalCode && (
              <span className="error">{errors.postalCode.message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="modal-footer bottom-btn-sec">
      <button type="button" className="btn btn-cancel" onClick={closeModal}>
        Cancel
      </button>
      <button
        type="button"
        className="btn btn-submit"
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      >
        {isLoading ? 'Loading...' : 'Save'}
      </button>
    </div>
  );

  return (
    <CustomModal
      className="modal fade elite-delivery-modal show"
      dialgName="modal-dialog-scrollable"
      show={!!showModal}
      closeModal={closeModal}
      body={renderBody()}
      header={renderHeader()}
      footer={renderFooter()}
      isLoading={false}
    />
  );
}
