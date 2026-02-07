import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomModal from '../../components/common/CustomModal';
import useServiceReducer from '../../stores/ServiceReducer';
import CustomSelect from './Select';

const USE_MOCK = true;

// ✅ Dummy centers list (Select Center dropdown)
const mockServiceTypes = [
  { id: '1', name: 'Attestation' },
  { id: '2', name: 'Visa' },
  { id: '3', name: 'Passport' },
  { id: '4', name: 'OCI' },
];

const nameSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(20, 'Name must be 20 characters or less'),
  serviceTypeId: z.string().nonempty('Service Type is required'),
});

export function AddEditModal({ showModal, closeModal, onRefreshService }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: '',
      serviceTypeId: '',
    },
  });

  const { postData, patchData, isLoading, getAllServiceType, serviceTypes } =
    useServiceReducer((state) => state);

  const selectedServiceTypeId = watch('serviceTypeId');

  // ✅ Load center list (API mode only)
  useEffect(() => {
    if (!USE_MOCK) getAllServiceType();
  }, []);

  // ✅ Fill form for edit / clear for add
  useEffect(() => {
    const serviceTypes = USE_MOCK ? mockServiceTypes : serviceTypes;

    if (showModal?.id && (serviceTypes?.length || 0) > 0) {
      // Your listing page now uses counterName/centerName.
      // For edit modal, accept both old & new keys safely.
      setValue('name', showModal?.serviceName || showModal?.name || '');
      setValue(
        'serviceTypeId',
        String(showModal?.serviceTypeId || showModal?.serviceType?.id || showModal?.serviceTypeId || '')
      );
    } else if (!showModal?.id) {
      reset();
    }
  }, [showModal?.id, serviceTypes, reset, setValue]);

  // ✅ Options for select
  const serviceTypeOptions = useMemo(() => {
    const serviceTypes = USE_MOCK ? mockServiceTypes : serviceTypes || [];
    return serviceTypes.map((item) => ({
      label: item.name,
      value: String(item.id),
    }));
  }, [serviceTypes]);

  // ✅ Dummy submit (no API)
  const onSubmit = (data) => {
    if (USE_MOCK) {
      // Just close modal + refresh UI
      onRefreshService?.();
      closeModal?.();
      return;
    }

    if (showModal?.id) {
      patchData({ id: showModal.id, ...data }, () => {
        onRefreshService?.();
      });
    } else {
      postData(data, () => {
        onRefreshService?.();
      });
    }
    closeModal?.();
  };

  const renderHeader = () => (
    <>
      <h4 className="modal-title">
        {showModal?.id ? 'Edit Service' : 'Add Service'}
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
    <div className="modal-body">
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group forms-custom">
            <label htmlFor="serviceTypeId" className="label">
              Select Service Type<span className="text-danger">*</span>
            </label>

            <CustomSelect
              options={serviceTypeOptions}
              value={
                serviceTypeOptions.find(
                  (option) => option.value === String(selectedServiceTypeId || '')
                ) || null
              }
              onChange={(selected) => {
                setValue('serviceTypeId', selected?.value || '');
              }}
              placeholder="Select Service Type"
              showIndicator={false}
              className="form-select form-control"
            />

            {errors.serviceTypeId && (
              <span className="error">{errors.serviceTypeId.message}</span>
            )}
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group forms-custom">
            <label htmlFor="name" className="label">
              Service Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              autoComplete="off"
              maxLength={20}
              placeholder="Enter service name"
              {...register('name')}
            />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
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
        disabled={USE_MOCK ? false : isLoading}
        onClick={handleSubmit(onSubmit)}
      >
        {USE_MOCK ? 'Save' : isLoading ? 'Loading...' : 'Save'}
      </button>
    </div>
  );

  return (
    <CustomModal
      className="modal fade category-modal show"
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
